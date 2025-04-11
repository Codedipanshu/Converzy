# **Converzy - OCR & Translation App**  

Converzy is a web application that allows users to extract text from images/PDFs and translate them between English and Hindi.  

## **Features**  
✅ Image & PDF OCR (Optical Character Recognition)  
✅ English ↔ Hindi Translation  
✅ Real-time Text Editing & Swapping  
✅ Image Upload & Direct Screenshot Paste Support  

---

## **Getting Started**  

### **1. Clone the Repository**  
```sh
git clone https://github.com/yourusername/converzy.git
```

### **2. Install Dependencies**  
```sh
cd client
npm install
cd ../server
npm install
```

---

## **Environment Variables (.env)**  
Create a `.env` file inside the **server** directory and add the following variables:  

```plaintext
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS="./vision-key.json"
GOOGLE_PROJECTID=your_project_id
GOOGLE_LOCATION=your_document_ai_location
GOOGLE_PROCESSID=your_document_ai_process_id
```

---

## **Google Cloud Vision API Setup**  

### **1. Enable Google Cloud Vision API**
- Go to the **Google Cloud Console**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
- Create a new project or use an existing one.
- Navigate to **APIs & Services** → **Library**.
- Search for **"Cloud Vision API"** and enable it.

### **2. Generate API Key & Service Account**
- Go to **APIs & Services** → **Credentials**.
- Click **Create Credentials** → **Service Account**.
- Assign **Editor** or **Owner** role.
- Click **Create Key** → **Select JSON**.
- Download the `vision-key.json` file.

### **3. Move the JSON Key**
- Move `vision-key.json` to your project's **server** directory.
- Ensure `.env` inside the server directory has the correct path:
  ```plaintext
  GOOGLE_APPLICATION_CREDENTIALS="./vision-key.json"
  ```

---

## **API Endpoints**  

### **1. Upload File (OCR)**
- **Endpoint:** `POST /ocr/image` (for images)  
- **Endpoint:** `POST /ocr/pdf` (for PDFs)  
- **Request:** Multipart form-data (`file`)  
- **Response:** Extracted text  

### **2. Translate Text**  
- **Endpoint:** `POST /translate`  
- **Request Body:**  
  ```json
  {
    "text": "Hello",
    "target": "hi"
  }
  ```
- **Response:** Translated text  

---

## **Run the Project**  

### **Start the Server**
```sh
cd server
npm run dev
```

### **Start the Client**
```sh
cd client
npm run dev
```

---

## **License**  
This project is open-source and free to use.  
