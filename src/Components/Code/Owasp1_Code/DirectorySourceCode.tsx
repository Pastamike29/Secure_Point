
import { CodeSnippets } from "../../../Components/Code/CodeSnippets";

export const getDirectoryTraversalCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `const path = require('path');

// ฟังก์ชันเพื่อป้องกันการเข้าถึงไฟล์ที่ไม่อนุญาต
app.get('/file/:filename', (req, res) => {
    // กำหนดไดเรกทอรีที่สามารถเข้าถึงได้
    const baseDir = path.join(__dirname, 'public_files');

    // เชื่อมเส้นทางไฟล์เข้ากับชื่อไฟล์จากผู้ใช้ แต่ไม่ให้เลื่อนระดับไปนอกไดเรกทอรี
    const filePath = path.join(baseDir, path.basename(req.params.filename));

    // ตรวจสอบว่าไฟล์อยู่ในไดเรกทอรีที่กำหนดหรือไม่
    if (filePath.startsWith(baseDir)) {
        res.sendFile(filePath);
    } else {
        res.status(403).send('Access Denied');
    }
});
`,
           python: `from flask import Flask, send_from_directory, abort
import os

app = Flask(__name__)

# ฟังก์ชันเพื่อป้องกันการเข้าถึงไฟล์ที่ไม่อนุญาต
@app.route('/file/<filename>')
def get_file(filename):
    # กำหนดไดเรกทอรีที่สามารถเข้าถึงได้
    base_dir = os.path.join(os.getcwd(), 'public_files')

    # สร้างเส้นทางไฟล์จากชื่อไฟล์ที่ได้รับ
    file_path = os.path.join(base_dir, filename)

    # ตรวจสอบว่าไฟล์อยู่ในไดเรกทอรีที่กำหนดหรือไม่
    if os.path.commonprefix([file_path, base_dir]) == base_dir:
        return send_from_directory(base_dir, filename)
    else:
        abort(403)  # หากไฟล์ไม่ได้อยู่ในไดเรกทอรีที่อนุญาต จะให้ส่ง HTTP 403

if __name__ == '__main__':
    app.run(debug=True)
`,
           java: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class FileAccessApp {
    public static void main(String[] args) {
        SpringApplication.run(FileAccessApp.class, args);
    }
}

@RestController
class FileController {

    // ฟังก์ชันเพื่อป้องกันการเข้าถึงไฟล์ที่ไม่อนุญาต
    @GetMapping("/file/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException {
        // กำหนดไดเรกทอรีที่สามารถเข้าถึงได้
        Path baseDir = Paths.get("public_files").toAbsolutePath().normalize();

        // สร้างเส้นทางไฟล์จากชื่อไฟล์ที่ได้รับ
        Path filePath = baseDir.resolve(filename).normalize();

        // ตรวจสอบว่าไฟล์อยู่ในไดเรกทอรีที่กำหนดหรือไม่
        if (!filePath.startsWith(baseDir)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        // โหลดไฟล์และส่งกลับ
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok().body(resource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
`,
         };
   
   
       default:
         return {
           javascript: `console.log('Directory Traversal default code');`,
         };
     }
   };