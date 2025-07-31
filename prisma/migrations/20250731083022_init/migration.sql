-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "profilePicture" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastName" DROP NOT NULL;
