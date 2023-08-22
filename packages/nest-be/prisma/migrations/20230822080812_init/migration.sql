-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "specializationId" INTEGER NOT NULL,
    CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Employee_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CV" (
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
    CONSTRAINT "CV_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectName" TEXT NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "teamSize" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "CvsProject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectName" TEXT NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "teamSize" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TeamRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Responsibility" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Specialization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CVToLanguage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CVToLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "CV" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CVToLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "Language" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CVToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CVToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "CV" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CVToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CVToCvsProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CVToCvsProject_A_fkey" FOREIGN KEY ("A") REFERENCES "CV" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CVToCvsProject_B_fkey" FOREIGN KEY ("B") REFERENCES "CvsProject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProjectToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProjectToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProjectToResponsibility" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProjectToResponsibility_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectToResponsibility_B_fkey" FOREIGN KEY ("B") REFERENCES "Responsibility" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProjectToTeamRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProjectToTeamRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectToTeamRole_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamRole" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CvsProjectToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CvsProjectToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "CvsProject" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CvsProjectToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CvsProjectToResponsibility" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CvsProjectToResponsibility_A_fkey" FOREIGN KEY ("A") REFERENCES "CvsProject" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CvsProjectToResponsibility_B_fkey" FOREIGN KEY ("B") REFERENCES "Responsibility" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CvsProjectToTeamRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CvsProjectToTeamRole_A_fkey" FOREIGN KEY ("A") REFERENCES "CvsProject" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CvsProjectToTeamRole_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamRole" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRole_name_key" ON "TeamRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Responsibility_name_key" ON "Responsibility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Specialization_name_key" ON "Specialization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CVToLanguage_AB_unique" ON "_CVToLanguage"("A", "B");

-- CreateIndex
CREATE INDEX "_CVToLanguage_B_index" ON "_CVToLanguage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CVToSkill_AB_unique" ON "_CVToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_CVToSkill_B_index" ON "_CVToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CVToCvsProject_AB_unique" ON "_CVToCvsProject"("A", "B");

-- CreateIndex
CREATE INDEX "_CVToCvsProject_B_index" ON "_CVToCvsProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToSkill_AB_unique" ON "_ProjectToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToSkill_B_index" ON "_ProjectToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToResponsibility_AB_unique" ON "_ProjectToResponsibility"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToResponsibility_B_index" ON "_ProjectToResponsibility"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTeamRole_AB_unique" ON "_ProjectToTeamRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTeamRole_B_index" ON "_ProjectToTeamRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CvsProjectToSkill_AB_unique" ON "_CvsProjectToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_CvsProjectToSkill_B_index" ON "_CvsProjectToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CvsProjectToResponsibility_AB_unique" ON "_CvsProjectToResponsibility"("A", "B");

-- CreateIndex
CREATE INDEX "_CvsProjectToResponsibility_B_index" ON "_CvsProjectToResponsibility"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CvsProjectToTeamRole_AB_unique" ON "_CvsProjectToTeamRole"("A", "B");

-- CreateIndex
CREATE INDEX "_CvsProjectToTeamRole_B_index" ON "_CvsProjectToTeamRole"("B");
