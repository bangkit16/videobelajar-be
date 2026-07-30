import { sequelize } from "../lib/sequelize";
import "../model"; // registrasi model & asosiasi

import {
  User,
  ClassCategory,
  Class,
  Tutor,
  ClassTutor,
  ClassModules,
  Material,
  PreTest,
  Order,
  MyClass,
  Review,
} from "../model";

import {
  users,
  categories,
  classes,
  pretestQuestions,
  orders,
  myClasses,
  reviews,
} from "./seed-data";
import type { TutorSeed } from "./seed-data";

async function seedSequelize() {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL via Sequelize\n");

    // ── Clear ──────────────────────────────────────────────────────────────
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    await Review.destroy({ where: {}, truncate: true });
    await MyClass.destroy({ where: {}, truncate: true });
    await Order.destroy({ where: {}, truncate: true });
    await PreTest.destroy({ where: {}, truncate: true });
    await Material.destroy({ where: {}, truncate: true });
    await ClassModules.destroy({ where: {}, truncate: true });
    await ClassTutor.destroy({ where: {}, truncate: true });
    await Tutor.destroy({ where: {}, truncate: true });
    await Class.destroy({ where: {}, truncate: true });
    await ClassCategory.destroy({ where: {}, truncate: true });
    await User.destroy({ where: {}, truncate: true });

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    // ════════════════════════════════════════════════════════════════════════
    // 1. USERS
    // ════════════════════════════════════════════════════════════════════════
    const userEmailMap = new Map<string, number>();
    for (const u of users) {
      const user = await User.create({
        countryCode: u.countryCode,
        fullname: u.fullname,
        username: u.username,
        email: u.email,
        password: u.password,
        phoneNumber: u.phoneNumber,
        profileImage: u.profileImage,
      });
      userEmailMap.set(u.email, (user as any).id);
    }
    console.log(`  ✅ ${users.length} users`);

    // ════════════════════════════════════════════════════════════════════════
    // 2. CATEGORIES
    // ════════════════════════════════════════════════════════════════════════
    const catSlugMap = new Map<string, number>();
    for (const c of categories) {
      const cat = await ClassCategory.create({
        categorySlug: c.slug,
        categoryName: c.name,
      });
      catSlugMap.set(c.slug, (cat as any).id);
    }
    console.log(`  ✅ ${categories.length} categories`);

    // ════════════════════════════════════════════════════════════════════════
    // 3. TUTORS (global, unique by userName)
    // ════════════════════════════════════════════════════════════════════════
    const tutorNameToId = new Map<string, number>();

    // Collect unique tutors from all classes
    const uniqueTutors = new Map<string, TutorSeed>();
    for (const cls of classes) {
      for (const t of cls.tutors) {
        if (!uniqueTutors.has(t.userName)) {
          uniqueTutors.set(t.userName, t);
        }
      }
    }

    for (const [userName, t] of uniqueTutors) {
      const tutorUser = await User.create({
        countryCode: "+62",
        fullname: userName,
        username: userName.toLowerCase().replace(/\s+/g, "."),
        email: `${userName.toLowerCase().replace(/\s+/g, ".")}@tutor.videobelajar.com`,
        password: "tutor123",
        phoneNumber: "",
        profileImage: t.avatar,
      });
      const tutorUserId = (tutorUser as any).id as number;

      const tutorRec = await Tutor.create({
        userId: tutorUserId,
        avatar: t.avatar,
        company: t.company,
        role: t.role,
      });
      tutorNameToId.set(userName, (tutorRec as any).id as number);
    }
    console.log(`  ✅ ${uniqueTutors.size} tutors`);

    // ════════════════════════════════════════════════════════════════════════
    // 4. CLASSES + ClassTutor links
    // ════════════════════════════════════════════════════════════════════════
    const classSlugMap = new Map<string, number>();

    for (const cls of classes) {
      const catId = catSlugMap.get(cls.categorySlug);
      if (!catId) {
        console.warn(`  ⚠️  Category "${cls.categorySlug}" not found`);
        continue;
      }

      const classRec = await Class.create({
        categoryId: catId,
        title: cls.title,
        slug: cls.slug,
        description: cls.description,
        price: cls.price,
        originalPrice: cls.originalPrice,
        discount: cls.discount,
        promoEndsIn: cls.promoEndsIn,
        bgImage: cls.bgImage,
        duration: cls.duration,
        language: cls.language,
        totalVideos: cls.totalVideos,
        totalDocuments: cls.totalDocuments,
        hasPretest: cls.hasPretest,
        hasFinalExam: cls.hasFinalExam,
        hasCertificate: cls.hasCertificate,
      });
      const classId = (classRec as any).id;
      classSlugMap.set(cls.slug, classId);

      // Link tutors via ClassTutor junction
      for (const t of cls.tutors) {
        const tutorId = tutorNameToId.get(t.userName);
        if (tutorId) {
          await sequelize.query(
            `INSERT INTO ClassTutor (classId, tutorId) VALUES (${classId}, ${tutorId})`
          );
        }
      }
    }
    console.log(`  ✅ ${classes.length} classes linked to tutors`);

    // ════════════════════════════════════════════════════════════════════════
    // 5. MODULES + MATERIALS + PRETEST
    // ════════════════════════════════════════════════════════════════════════
    let totalModules = 0;
    let totalMaterials = 0;

    for (const cls of classes) {
      const classId = classSlugMap.get(cls.slug);
      if (!classId) continue;

      // Pre-test module (sortOrder 0) if hasPretest
      if (cls.hasPretest) {
        const pretestMod = await ClassModules.create({
          classId,
          sortOrder: 0,
          title: "Pre-Test",
          duration: 5,
        });
        const pretestModuleId = (pretestMod as any).id;
        totalModules++;

        const pretestMat = await Material.create({
          moduleId: pretestModuleId,
          sortOrder: 1,
          title: `Pre-Test: ${cls.title}`,
          type: "quiz",
          duration: 5,
          linkMaterial: null,
          linkFile: null,
          passingScore: 80,
        });
        const pretestMatId = (pretestMat as any).id;
        totalMaterials++;

        // Insert pretest questions
        let sortQ = 0;
        for (const q of pretestQuestions) {
          sortQ++;
          await PreTest.create({
            materialId: pretestMatId,
            sortOrder: sortQ,
            question: q.question,
            optionA: q.optionA,
            optionB: q.optionB,
            optionC: q.optionC,
            optionD: q.optionD,
            correctAnswer: q.correctAnswer,
          });
        }
      }

      // Regular modules
      for (const mod of cls.modules) {
        const actualSort = cls.hasPretest ? mod.sortOrder + 1 : mod.sortOrder;
        const classMod = await ClassModules.create({
          classId,
          sortOrder: actualSort,
          title: mod.title,
          duration: mod.duration,
        });
        const modId = (classMod as any).id;
        totalModules++;

        for (const mat of mod.materials) {
          await Material.create({
            moduleId: modId,
            sortOrder: mat.sortOrder,
            title: mat.title,
            type: mat.type,
            duration: mat.duration,
            linkMaterial: mat.linkMaterial,
            linkFile: mat.linkFile,
            passingScore: mat.passingScore,
          });
          totalMaterials++;
        }
      }
    }
    console.log(`  ✅ ${totalModules} modules, ${totalMaterials} materials, ${pretestQuestions.length} pretest questions`);

    // ════════════════════════════════════════════════════════════════════════
    // 6. ORDERS
    // ════════════════════════════════════════════════════════════════════════
    let orderCount = 0;
    for (const o of orders) {
      const userId = userEmailMap.get(o.userEmail);
      const classId = classSlugMap.get(o.classSlug);
      if (!userId || !classId) {
        console.warn(`  ⚠️  Order skipped: user "${o.userEmail}" or class "${o.classSlug}" not found`);
        continue;
      }
      await Order.create({
        classId,
        userId,
        noInvoice: o.noInvoice,
        adminFee: o.adminFee,
        totalPayment: o.totalPayment,
        status: o.status,
      });
      orderCount++;
    }
    console.log(`  ✅ ${orderCount} orders`);

    // ════════════════════════════════════════════════════════════════════════
    // 7. MYCLASS
    // ════════════════════════════════════════════════════════════════════════
    let myClassCount = 0;
    for (const mc of myClasses) {
      const userId = userEmailMap.get(mc.userEmail);
      const classId = classSlugMap.get(mc.classSlug);
      if (!userId || !classId) {
        console.warn(`  ⚠️  MyClass skipped: user "${mc.userEmail}" or class "${mc.classSlug}" not found`);
        continue;
      }
      await MyClass.create({
        classId,
        userId,
        status: mc.status,
        completedModule: mc.completedModule,
      });
      myClassCount++;
    }
    console.log(`  ✅ ${myClassCount} my-class enrollments`);

    // ════════════════════════════════════════════════════════════════════════
    // 8. REVIEWS
    // ════════════════════════════════════════════════════════════════════════
    let reviewCount = 0;
    for (const r of reviews) {
      const classId = classSlugMap.get(r.classSlug);
      const firstUserId = userEmailMap.get(users[0]!.email);
      if (!classId || !firstUserId) continue;

      await Review.create({
        classId,
        userId: firstUserId,
        rating: r.rating,
        text: r.text,
        alumniOfBatch: r.alumniOfBatch,
      });
      reviewCount++;
    }
    console.log(`  ✅ ${reviewCount} reviews`);

    console.log("\n✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedSequelize();
