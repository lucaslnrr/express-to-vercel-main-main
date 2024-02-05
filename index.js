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
      const fileName = req.file.originalname.replace('.csv', ''); // Extract the name of the uploaded file without the extension
      
      // Convert CSV to JSON
      const jsonArray = await csvtojson({ delimiter: ';' }).fromString(csvBuffer);
      
      // Create a new worksheet with reordered columns
      const reorderedHeaders = ['Header3', 'Header1', 'Header2']; // Change the order as needed
      const reorderedData = jsonArray.map(row => reorderedHeaders.map(header => row[header]));
      
      const ws = xlsx.utils.aoa_to_sheet([reorderedHeaders, ...reorderedData]);
      
      // Create a new workbook and add the worksheet
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, fileName); // Set the worksheet name to match the file name
      
      // Convert the workbook to a buffer
      const xlsxBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      // Set response headers for file download
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
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
