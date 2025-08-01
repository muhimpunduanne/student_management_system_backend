/*
  Warnings:

  - You are about to drop the `_CourseToStudent` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profilePicture` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_CourseToStudent" DROP CONSTRAINT "_CourseToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToStudent" DROP CONSTRAINT "_CourseToStudent_B_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "profilePicture" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastName" SET NOT NULL;

-- DropTable
DROP TABLE "_CourseToStudent";

-- CreateTable
CREATE TABLE "StudentCourse" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "StudentCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentCourse_studentId_courseId_key" ON "StudentCourse"("studentId", "courseId");

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
