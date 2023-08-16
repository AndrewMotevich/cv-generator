/*
  Warnings:

  - You are about to drop the `_DepartmentToEmployee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EmployeeToSpecialization` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departmentId` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specializationId` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_DepartmentToEmployee_B_index";

-- DropIndex
DROP INDEX "_DepartmentToEmployee_AB_unique";

-- DropIndex
DROP INDEX "_EmployeeToSpecialization_B_index";

-- DropIndex
DROP INDEX "_EmployeeToSpecialization_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DepartmentToEmployee";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_EmployeeToSpecialization";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_employees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "specializationId" INTEGER NOT NULL,
    CONSTRAINT "employees_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "employees_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_employees" ("email", "firstName", "id", "lastName") SELECT "email", "firstName", "id", "lastName" FROM "employees";
DROP TABLE "employees";
ALTER TABLE "new_employees" RENAME TO "employees";
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
CREATE UNIQUE INDEX "employees_firstName_lastName_key" ON "employees"("firstName", "lastName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
