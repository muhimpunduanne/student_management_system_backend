const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updateStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { phone, courses } = req.body; // courses should be an array of course IDs
    const profilePicture = req.file?.path;

    // Find existing student
    let student = await prisma.student.findUnique({
      where: { userId },
      include: { courses: true },
    });

    if (!student) {
      if (!profilePicture) {
        return res.status(400).json({ message: "Profile picture is required" });
      }

      student = await prisma.student.create({
        data: {
          phone,
          profilePicture,
          user: { connect: { id: userId } },
        },
      });
    } else {
      student = await prisma.student.update({
        where: { userId },
        data: {
          phone,
          profilePicture: profilePicture || student.profilePicture,
        },
      });
    }


    if (Array.isArray(courses)) {
     
      await prisma.studentCourse.deleteMany({
        where: { studentId: student.id },
      });


      const courseData = courses.map((courseId) => ({
        studentId: student.id,
        courseId,
      }));

      if (courseData.length > 0) {
        await prisma.studentCourse.createMany({
          data: courseData,
          skipDuplicates: true,
        });
      }
    }

    // Fetch updated student with courses
    const updatedStudent = await prisma.student.findUnique({
      where: { userId },
      include: {
        courses: {
          include: { course: true },
        },
      },
    });

    res.status(200).json({
      message: "Student profile updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Update Student Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
