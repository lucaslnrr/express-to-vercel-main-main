import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';
import smtpTransport from 'nodemailer-smtp-transport';
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

app.post('/authorizePurchaseOrder', async (req, res) => {
  try {
    const purchaseOrderId = req.body.purchaseOrderId;
    const username = 'guerrero-approval';
    const password = '4VpNIGrg93lBKsdV983i9skSCwRhoHtW'; 
    const apiUrl = `https://api.sienge.com.br/guerrero/public/api/v1/purchase-orders/${purchaseOrderId}/authorize`;
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
      },
      body: JSON.stringify({})
    });

    console.log(purchaseOrderId);
    console.log('Response status:', response.status);

    if (response.status === 204) {
      console.log('Pedido Autorizado');
      return res.status(204).end(); // Send 204 No Content response
    }

    const responseBody = await response.json();
    console.log('Response body:', responseBody);

    res.json(responseBody); // Return the response body as JSON
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/submitTaxInformation', async (req, res) => {
  try {
      const { billId, cofinsTaxSituation, taxService, measurementUnit, serviceCodeId, pisTaxSituation, unitPrice, quantity, natureServiceId } = req.body;

      const username = 'guerrero-felipesantos';
      const password = 'd0YnARDcra45tSC3jD8ip89MMuBpm2kN';

      const apiUrl = `https://api.sienge.com.br/guerrero/public/api/v1/bills/${billId}/tax-information/items`;

      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
          },
          body: JSON.stringify({
              cofinsTaxSituation,
              taxService,
              measurementUnit,
              serviceCodeId,
              pisTaxSituation,
              unitPrice,
              quantity,
              natureServiceId
          })
      });

      const responseData = await response.json();
      res.json(responseData);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
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
