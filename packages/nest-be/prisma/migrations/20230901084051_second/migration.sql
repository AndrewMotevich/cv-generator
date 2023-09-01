-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CV" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cvName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "specializationId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    CONSTRAINT "CV_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CV_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CV_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CV" ("cvName", "departmentId", "email", "employeeId", "firstName", "id", "lastName", "specializationId") SELECT "cvName", "departmentId", "email", "employeeId", "firstName", "id", "lastName", "specializationId" FROM "CV";
DROP TABLE "CV";
ALTER TABLE "new_CV" RENAME TO "CV";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
