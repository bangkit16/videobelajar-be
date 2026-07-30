import { User } from "./user.model";
import { ClassCategory } from "./class-category.model";
import { Class } from "./class.model";
import { Tutor } from "./tutor.model";
import { ClassTutor } from "./class-tutor.model";
import { ClassModules } from "./class-modules.model";
import { Material } from "./material.model";
import { PreTest } from "./pre-test.model";
import { Order } from "./order.model";
import { Payment } from "./payment.model";
import { MyClass } from "./my-class.model";
import { Review } from "./review.model";

// ---- Associations ----
// ClassCategory -> Class
ClassCategory.hasMany(Class, { foreignKey: "categoryId", as: "classes" });
Class.belongsTo(ClassCategory, { foreignKey: "categoryId", as: "category" });

// User -> Tutor (1-to-1), Order, MyClass, Review
User.hasOne(Tutor, { foreignKey: "userId", as: "tutor" });
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
User.hasMany(MyClass, { foreignKey: "userId", as: "myClasses" });
User.hasMany(Review, { foreignKey: "userId", as: "reviews" });

// Class -> Tutor (many-to-many), ClassModules, Order, MyClass, Review
Class.belongsToMany(Tutor, { through: ClassTutor, as: "tutors", foreignKey: "classId", otherKey: "tutorId" });
Class.hasMany(ClassModules, { foreignKey: "classId", as: "modules" });
Class.hasMany(Order, { foreignKey: "classId", as: "orders" });
Class.hasMany(MyClass, { foreignKey: "classId", as: "myClasses" });
Class.hasMany(Review, { foreignKey: "classId", as: "reviews" });

// Tutor -> User (1-to-1), Class (many-to-many)
Tutor.belongsTo(User, { foreignKey: "userId", as: "user" });
Tutor.belongsToMany(Class, { through: ClassTutor, as: "classes", foreignKey: "tutorId", otherKey: "classId" });

// ClassModules -> Class, Material
ClassModules.belongsTo(Class, { foreignKey: "classId", as: "class" });
ClassModules.hasMany(Material, { foreignKey: "moduleId", as: "materials" });

// Material -> ClassModules, PreTest
Material.belongsTo(ClassModules, { foreignKey: "moduleId", as: "module" });
Material.hasMany(PreTest, { foreignKey: "materialId", as: "preTests" });

// PreTest -> Material
PreTest.belongsTo(Material, { foreignKey: "materialId", as: "material" });

// Order -> User, Class, Payment
Order.belongsTo(User, { foreignKey: "userId", as: "user" });
Order.belongsTo(Class, { foreignKey: "classId", as: "class" });
Order.hasOne(Payment, { foreignKey: "orderId", as: "payment" });

// Payment -> Order
Payment.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// MyClass -> User, Class
MyClass.belongsTo(User, { foreignKey: "userId", as: "user" });
MyClass.belongsTo(Class, { foreignKey: "classId", as: "class" });

// Review -> User, Class
Review.belongsTo(User, { foreignKey: "userId", as: "user" });
Review.belongsTo(Class, { foreignKey: "classId", as: "class" });

// ---- Exports ----
export { User, ClassCategory, Class, Tutor, ClassTutor, ClassModules, Material, PreTest, Order, Payment, MyClass, Review };
