import fitz
import json

files_to_read = [
    r"c:\Users\yusuf\Desktop\html5up-editorial\Kariyer\Profile.pdf",
    r"c:\Users\yusuf\Desktop\html5up-editorial\Kariyer\Yusuf_İslam_Budak_CV.pdf"
]

results = {}

for pdf_file in files_to_read:
    try:
        doc = fitz.open(pdf_file)
        full_text = ""
        for page in doc:
            full_text += page.get_text("text") + "\n"
        results[pdf_file.split("\\")[-1]] = full_text
        doc.close()
    except Exception as e:
        results[pdf_file.split("\\")[-1]] = f"Error: {e}"

with open("c:/Users/yusuf/Desktop/html5up-editorial/career_extract.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=4)
print("Finished!")
