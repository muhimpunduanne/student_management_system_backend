const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updateStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { phone, course } = req.body;
    const profilePicture = req.file?.path;

    let student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      student = await prisma.student.create({
        data: {
          phone,
          course,
          profilePicture,
          user: {
            connect: { id: userId },
          },
        },
      });
    } else {
      student = await prisma.student.update({
        where: { userId },
        data: {
          phone,
          course,
          profilePicture: profilePicture || student.profilePicture, 
        },
      });
    }

    res.status(200).json({
      message: "Student profile updated successfully",
      student,
    });
  } catch (error) {
    console.error("Update Student Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
