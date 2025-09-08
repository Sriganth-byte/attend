// roleUtils.js
export function detectRole(email, passkey = null) {
  if (!email) return "invalid";

  const lowerEmail = email.toLowerCase();

  // ✅ Student: email starts with a digit (e.g., 7278...@domain.com)
  const studentRegex = /^[0-9]/;

  // ✅ Teacher: normal email (must contain @ and domain)
  const teacherRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

  // 🔑 Admin upgrade: Teacher + correct passkey
  if (teacherRegex.test(lowerEmail)) {
    if (passkey === "8610") {
      return "admin";
    }
    return "teacher";
  }

  // 🎓 Student rule check
  if (studentRegex.test(lowerEmail)) {
    return "student";
  }

  return "invalid";
}
