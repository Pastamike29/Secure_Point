
import { CodeSnippets } from "../CodeSnippets";

export const getToxicDependenciesCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `# ใช้คำสั่งนี้เพื่อตรวจสอบว่า dependencies ของคุณมีอัปเดตใหม่หรือไม่
npm outdated

# ใช้คำสั่งนี้เพื่อติดตั้งเวอร์ชันล่าสุดของ dependencies
npm update
`,
           python: `# ตรวจสอบว่า dependencies มีอัปเดตใหม่หรือไม่
pip list --outdated

# ติดตั้งเวอร์ชันล่าสุดของ dependencies
pip install --upgrade <package_name>
`,
           java: `# ตรวจสอบ dependencies ที่ต้องอัปเดต
mvn versions:display-dependency-updates

# อัปเดต dependencies ที่ล้าสมัยใน pom.xml ให้เป็นเวอร์ชันล่าสุด (ต้องแก้ไขเองในไฟล์ pom.xml)
mvn versions:use-latest-releases
`,
         };
       case 'Lesson2':
         return {
           javascript: `# ใช้คำสั่งนี้เพื่อตรวจสอบช่องโหว่ใน dependencies
npm audit

# ใช้คำสั่งนี้เพื่อตรวจสอบข้อมูลเกี่ยวกับไลบรารีที่ถูกทิ้งร้าง
npm info <package-name>  # เช่น npm info lodash
`,
           python: `pip install safety
safety check

pip search <package-name>  # ตัวอย่าง: pip search requests

`,
           java: `mvn org.owasp:dependency-check-maven:check
mvn dependency:tree -Dverbose
mvn dependency:analyze
`,
         };
   
    
   
       default:
         return {
           javascript: `console.log('Directory Traversal default code');`,
         };
     }
   };