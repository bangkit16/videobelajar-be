import { User } from "./user.model";
import { ClassCategory } from "./class-category.model";
import { Class } from "./class.model";
import { Tutor } from "./tutor.model";
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

// User -> Tutor, Order, MyClass, Review
User.hasMany(Tutor, { foreignKey: "userId", as: "tutors" });
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
User.hasMany(MyClass, { foreignKey: "userId", as: "myClasses" });
User.hasMany(Review, { foreignKey: "userId", as: "reviews" });

// Class -> Tutor, ClassModules, Order, MyClass, Review
Class.hasMany(Tutor, { foreignKey: "classId", as: "tutors" });
Class.hasMany(ClassModules, { foreignKey: "classId", as: "modules" });
Class.hasMany(Order, { foreignKey: "classId", as: "orders" });
Class.hasMany(MyClass, { foreignKey: "classId", as: "myClasses" });
Class.hasMany(Review, { foreignKey: "classId", as: "reviews" });

// Tutor -> User, Class
Tutor.belongsTo(User, { foreignKey: "userId", as: "user" });
Tutor.belongsTo(Class, { foreignKey: "classId", as: "class" });

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
export { User, ClassCategory, Class, Tutor, ClassModules, Material, PreTest, Order, Payment, MyClass, Review };
