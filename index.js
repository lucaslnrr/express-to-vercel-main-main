import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import multer from 'multer';
import csvtojson from 'csvtojson';
import xlsx from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import smtpTransport from 'nodemailer-smtp-transport';
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
  
      // Create a new worksheet
      const ws = xlsx.utils.aoa_to_sheet(jsonArray.map(row => Object.values(row).map(value => value.trim())));
  
      // Create a new workbook and add the worksheet
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      const xlsxBuffer = xlsx.write(wb, {
        bookType: 'xlsx',
        type: 'buffer',
        bookSST: false,
        bookFiles: ['xl/styles.xml'],
        MimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        Props: {
          Title: 'Your Title',
          Author: 'Your Author',
          CreatedDate: new Date(),
        },
        SheetNames: ['Sheet1'], // Make sure the SheetNames option is specified
        Sheets: {
          'Sheet1': ws, // Make sure the Sheets option is specified with your worksheet
        },
        bookProps: {
          date1904: false,
          defaultAuthor: 'Your Author',
          defaultTitle: 'Your Title',
          use1904Dates: false,
        },
        bookType: 'xlsx',
        fileType: 'buffer',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        sheetProps: {
          date1904: false,
          defaultRowHeight: 15,
          defaultColWidth: 9,
          dyDescent: 0.25,
          outlineLevelCol: 0,
          outlineLevelRow: 0,
          showGridLines: true,
          showRowColHeaders: true,
          showSummaryBelow: true,
          tabColor: null,
          view: 'normal',
          zoomScale: 100,
          zoomToFit: false,
        },
        SheetNames: ['Sheet1'], // Make sure the SheetNames option is specified
        Sheets: {
          'Sheet1': ws, // Make sure the Sheets option is specified with your worksheet
        },
      });
      
      // Set response headers for file download
      res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  
      // Send XLSX file as response
      res.send(xlsxBuffer);
    } catch (error) {
      console.error('Error handling file upload:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(process.env.PORT || 3001);
export default app;
