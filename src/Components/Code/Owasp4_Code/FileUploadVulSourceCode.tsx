
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../CodeSnippets";

export const getFileUploadVulnerabilitiesCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `function validateFileType(file) {
  // 1. กำหนดประเภทไฟล์ที่อนุญาต
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

  // 2. ดึงนามสกุลของไฟล์
  const fileExtension = file.name.split('.').pop().toLowerCase();

  // 3. ตรวจสอบว่านามสกุลไฟล์อยู่ในรายการที่อนุญาตหรือไม่
  if (allowedExtensions.includes(fileExtension)) {
    console.log('File type is allowed.');
    return true;
  } else {
    console.error('File type not allowed.');
    return false;
  }
}

// การใช้งานฟังก์ชัน
const fileInput = document.querySelector('#fileInput');
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && !validateFileType(file)) {
    alert('File type not allowed. Please upload a valid file.');
    fileInput.value = ''; // ล้างค่าของ input
  }
});
`,
           python: `import os

def validate_file_type(file_name):
    # 1. กำหนดประเภทไฟล์ที่อนุญาต
    allowed_extensions = ['jpg', 'jpeg', 'png', 'pdf']

    # 2. ดึงนามสกุลของไฟล์
    file_extension = os.path.splitext(file_name)[1][1:].lower()

    # 3. ตรวจสอบว่านามสกุลไฟล์อยู่ในรายการที่อนุญาตหรือไม่
    if file_extension in allowed_extensions:
        print('File type is allowed.')
        return True
    else:
        print('File type not allowed.')
        return False

# การใช้งานฟังก์ชัน
file_name = 'example.jpg'  # จำลองชื่อไฟล์ที่จะตรวจสอบ
if not validate_file_type(file_name):
    print('File type not allowed. Please upload a valid file.')
`,
           java: `import java.io.File;

public class FileValidator {

    public static boolean validateFileType(String fileName) {
        // 1. กำหนดประเภทไฟล์ที่อนุญาต
        String[] allowedExtensions = {"jpg", "jpeg", "png", "pdf"};

        // 2. ดึงนามสกุลของไฟล์
        String fileExtension = "";
        int index = fileName.lastIndexOf('.');
        if (index > 0) {
            fileExtension = fileName.substring(index + 1).toLowerCase();
        }

        // 3. ตรวจสอบว่านามสกุลไฟล์อยู่ในรายการที่อนุญาตหรือไม่
        for (String ext : allowedExtensions) {
            if (ext.equals(fileExtension)) {
                System.out.println("File type is allowed.");
                return true;
            }
        }
        System.err.println("File type not allowed.");
        return false;
    }

    public static void main(String[] args) {
        // การใช้งานฟังก์ชัน
        String fileName = "example.jpg";  // จำลองชื่อไฟล์ที่จะตรวจสอบ
        if (!validateFileType(fileName)) {
            System.out.println("File type not allowed. Please upload a valid file.");
        }
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `function validateFileSize(file, maxSizeMB) {
  // 1. คำนวณขนาดไฟล์เป็นหน่วย MB
  const fileSizeMB = file.size / (1024 * 1024);

  // 2. ตรวจสอบว่าขนาดไฟล์ไม่เกินขนาดสูงสุดที่กำหนด
  if (fileSizeMB <= maxSizeMB) {
    console.log('File size is within the limit.');
    return true;
  } else {
    console.error('File size exceeds the limit.');
    return false;
  }
}

// การใช้งานฟังก์ชัน
const maxFileSizeMB = 2; // ขนาดไฟล์สูงสุด 2MB
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && !validateFileSize(file, maxFileSizeMB)) {
    alert('File size exceeds the limit. Please upload a smaller file.');
    fileInput.value = ''; // ล้างค่าของ input
  }
});
`,
           python: `import os

def validate_file_size(file_path, max_size_mb):
    # 1. Get the file size in MB
    file_size_mb = os.path.getsize(file_path) / (1024 * 1024)

    # 2. Check if the file size is within the limit
    if file_size_mb <= max_size_mb:
        print('File size is within the limit.')
        return True
    else:
        print('File size exceeds the limit.')
        return False

# Usage example
max_file_size_mb = 2  # Maximum file size of 2MB
file_path = 'path/to/your/file.ext'

if not validate_file_size(file_path, max_file_size_mb):
    print('Please upload a smaller file.')
`,
           java: `import java.io.File;

public class FileSizeValidator {

    public static boolean validateFileSize(File file, double maxSizeMB) {
        // 1. Calculate file size in MB
        double fileSizeMB = file.length() / (1024.0 * 1024.0);

        // 2. Check if the file size is within the limit
        if (fileSizeMB <= maxSizeMB) {
            System.out.println("File size is within the limit.");
            return true;
        } else {
            System.err.println("File size exceeds the limit.");
            return false;
        }
    }

    public static void main(String[] args) {
        double maxFileSizeMB = 2;  // Maximum file size of 2MB
        File file = new File("path/to/your/file.ext");

        if (!validateFileSize(file, maxFileSizeMB)) {
            System.out.println("Please upload a smaller file.");
        }
    }
}
`,
         };
   
  case 'Lesson3':
    return{
      Javascript:`const fs = require('fs');
const path = require('path');

function saveFile(file) {
  // 1. กำหนดชื่อใหม่ให้ไฟล์โดยสร้าง ID สุ่ม
  const newFileName = ''$'{Math.random().toString(36).substring(2, 15)}.'$'{file.name.split('.').pop()}';
  
  // 2. กำหนดเส้นทางการบันทึกไฟล์
  const uploadPath = path.join(__dirname, 'uploads', newFileName);

  // 3. บันทึกไฟล์ที่ถูกเปลี่ยนชื่อ
  file.mv(uploadPath, (err) => {
    if (err) {
      console.error('File upload failed:', err);
    } else {
      console.log('File uploaded successfully:', newFileName);
    }
  });
}
`,
python:`import os
import uuid
from shutil import copyfile

def save_file(file):
    # 1. Generate a new file name with a random UUID
    new_file_name = f"{uuid.uuid4().hex}.{file.filename.split('.')[-1]}"
    
    # 2. Set the path to save the file
    upload_path = os.path.join(os.getcwd(), 'uploads', new_file_name)
    
    # 3. Save the file to the designated path
    try:
        file.save(upload_path)
        print("File uploaded successfully:", new_file_name)
    except Exception as e:
        print("File upload failed:", e)
`,
java:`import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

public class FileUpload {

    public static void saveFile(File file) {
        // 1. Generate a new file name with a random UUID
        String newFileName = UUID.randomUUID().toString() + "." + getFileExtension(file.getName());

        // 2. Set the path to save the file
        String uploadPath = Paths.get(System.getProperty("user.dir"), "uploads", newFileName).toString();

        // 3. Save the file to the designated path
        try {
            Files.copy(file.toPath(), Paths.get(uploadPath));
            System.out.println("File uploaded successfully: " + newFileName);
        } catch (IOException e) {
            System.err.println("File upload failed: " + e.getMessage());
        }
    }

    // Helper function to get file extension
    private static String getFileExtension(String fileName) {
        int lastIndex = fileName.lastIndexOf('.');
        return (lastIndex != -1) ? fileName.substring(lastIndex + 1) : "";
    }
}
`

    };
   
       default:
         return {
           javascript: `console.log('Directory Traversal default code');`,
         };
     }
   };