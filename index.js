import express from 'express';
import cors from 'cors';
import multer from 'multer';
import csvtojson from 'csvtojson';
import ExcelJS from 'exceljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: join(__dirname, 'public') });
});

app.post('/upload', upload.single('csvFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const csvBuffer = req.file.buffer.toString();

        // Convert CSV to JSON
        const jsonArray = await csvtojson({ delimiter: ';' }).fromString(csvBuffer);

        // Create a new workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Add data to the worksheet
        jsonArray.forEach(row => {
            worksheet.addRow(Object.values(row).map(value => value.trim()));
        });

        // Extract original file name from the uploaded file
        const originalFileName = req.file.originalname.replace(/\.[^/.]+$/, ''); // Remove file extension

        // Set response headers for file download with the original file name
        res.setHeader('Content-Disposition', `attachment; filename=${originalFileName}.xls`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Convert the workbook to a buffer
        const excelBuffer = await workbook.xlsx.writeBuffer();

        // Send Excel file as response
        res.send(excelBuffer);
    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(process.env.PORT || 3001);
export default app;
