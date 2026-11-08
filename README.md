# 🎂 Age Calculator Project

## 📁 Folder Structure
```
age-calculator/
├── frontend/
│   ├── index.html    ← Main page
│   ├── style.css     ← Styling
│   └── script.js     ← Age calculate + Backend call
│
└── backend/
    ├── server.js     ← Express server
    ├── package.json  ← Dependencies
    └── users_data.xlsx  ← (Auto-generated) Excel file
```

## 🚀 Kaise Chalao?

### Step 1 — Backend Start Karo
```bash
cd age-calculator/backend
node server.js
```
✅ Terminal mein dikhega: `Backend server chal raha hai: http://localhost:5000`

### Step 2 — Frontend Open Karo
`frontend/index.html` file ko browser mein open karo  
(double-click karo ya VS Code → Live Server use karo)

### Step 3 — Use Karo!
1. Name, DOB, Gender bhar ke "Calculate Age" button dabao
2. Age calculate hogi
3. Data automatically `backend/users_data.xlsx` mein save ho jayega!

## 📊 Excel File
`backend/users_data.xlsx` mein yeh columns hain:
| S.No | Name | Date of Birth | Gender | Age | Months | Days | Saved At |

