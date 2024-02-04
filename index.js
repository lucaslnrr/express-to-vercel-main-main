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
  
      // Convert the workbook to a buffer
      const xlsxBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
  
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

app.post('/server-teste', async (req, res) => {
  try {
    const { customKey, biResult, solicitante } = req.body;

    // Check if required data is present in the request
    if (!customKey || !biResult) {
      res.status(400).json({ error: 'Invalid request data' });
      return;
    }

    // Configure Nodemailer transporter using SMTP details from environment variables
    const usersendemail = process.env.USER_SEND_EMAIL;
    const usersendpassword = process.env.USER_SEND_PASSWORD;

    const transporter = nodemailer.createTransport(
      smtpTransport({
        name: 'hostgator',
        host: 'sh-pro76.hostgator.com.br',
        port: 465,
        secure: true,
        auth: {
          user: usersendemail,
          pass: usersendpassword,
        },
      })
    );
   const sub= `
   <!doctype html>
   <html lang="pt-br" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
   
   <head>
       <title>
   
       </title>
       <!--[if !mso]><!-- -->
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <!--<![endif]-->
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <style type="text/css">
           #outlook a {
               padding: 0;
           }
   
           .ReadMsgBody {
               width: 100%;
           }
   
           .ExternalClass {
               width: 100%;
           }
   
           .ExternalClass * {
               line-height: 100%;
           }
   
           body {
               margin: 0;
               padding: 0;
               -webkit-text-size-adjust: 100%;
               -ms-text-size-adjust: 100%;
           }
   
           table,
           td {
               border-collapse: collapse;
               mso-table-lspace: 0pt;
               mso-table-rspace: 0pt;
           }
   
           img {
               border: 0;
               height: auto;
               line-height: 100%;
               outline: none;
               text-decoration: none;
               -ms-interpolation-mode: bicubic;
           }
   
           p {
               display: block;
               margin: 13px 0;
           }
       </style>
       <!--[if !mso]><!-->
       <style type="text/css">
           @media only screen and (max-width:480px) {
               @-ms-viewport {
                   width: 320px;
               }
               @viewport {
                   width: 320px;
               }
           }
       </style>
       <!--<![endif]-->
       <!--[if mso]>
           <xml>
           <o:OfficeDocumentSettings>
             <o:AllowPNG/>
             <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
           </xml>
           <![endif]-->
       <!--[if lte mso 11]>
           <style type="text/css">
             .outlook-group-fix { width:100% !important; }
           </style>
           <![endif]-->
   
   
       <style type="text/css">
           @media only screen and (min-width:480px) {
               .mj-column-per-100 {
                   width: 100% !important;
               }
           }
       </style>
   
   
       <style type="text/css">
       </style>
   
   </head>
   
   <body style="background-color:#f9f9f9;">
   
   
       <div style="background-color:#f9f9f9;">
   
   
           <!--[if mso | IE]>
         <table
            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
         >
           <tr>
             <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
         <![endif]-->
   
   
           <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
   
               <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                   <tbody>
                       <tr>
                           <td style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                               <!--[if mso | IE]>
                     <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                   
           <tr>
         
           </tr>
         
                     </table>
                   <![endif]-->
                           </td>
                       </tr>
                   </tbody>
               </table>
   
           </div>
   
   
           <!--[if mso | IE]>
             </td>
           </tr>
         </table>
         
         <table
            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
         >
           <tr>
             <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
         <![endif]-->
   
   
           <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
   
               <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                   <tbody>
                       <tr>
                           <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                               <!--[if mso | IE]>
                     <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                   
           <tr>
         
               <td
                  style="vertical-align:top;width:600px;"
               >
             <![endif]-->
   
                               <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
   
                                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
   
                                       <tr>
                                           <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
   
                                               <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                   <tbody>
                                                       <tr>
                                                           <td style="width:64px;">
   
                                                               <img height="auto" src="https://i.ibb.co/6wvpQRL/women.jpg" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="64" />
   
                                                           </td>
                                                       </tr>
                                                   </tbody>
                                               </table>
   
                                           </td>
                                       </tr>
   
                                       <tr>
                                           <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
   
                                               <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                   Status ID: ${customKey}
                                               </div>
   
                                           </td>
                                       </tr>
   
                                       <tr>
                                           <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
   
                                               <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                   Olá!<br></br>
                                                  O status do ID ${customKey} foi atualizado para <span style="color: #ba6464;">${biResult}</span>.<br></br>
                                                   Você pode acompanhar todas essas atualizações pelo App.<br></br>
                                              
                                               </div>
   
                                           </td>
                                       </tr>
   
                                       <tr>
                                           <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">
   
                                           <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; line-height: 100%;">
                                           <tr>
                                               <td align="center" bgcolor="#2F67F6" role="presentation" style="border: none; border-radius: 3px; color: #ffffff; cursor: auto; padding: 15px 25px;" valign="middle">
                                                   <a href="https://guerreropassagens.web.app/" style="background: #2F67F6; color: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; font-weight: normal; line-height: 120%; Margin: 0; text-decoration: none; text-transform: none; display: inline-block;">
                                                       Visualizar ID no App
                                                   </a>
                                               </td>
                                           </tr>
                                       </table>
                                       
   
                                           </td>
                                       </tr>
   
                                       <tr>
                                           <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
   
                                               <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;color:#525252;">
                                                   Att. Felipe Santos<br>Departamento de TI<br>
                                                   <a href="guerreroconstrutora.com" style="color:#2F67F6">www.guerreroconstrutora.com</a>
                                               </div>
   
                                           </td>
                                       </tr>
   
                                   </table>
   
                               </div>
   
                               <!--[if mso | IE]>
               </td>
             
           </tr>
         
                     </table>
                   <![endif]-->
                           </td>
                       </tr>
                   </tbody>
               </table>
   
           </div>
   
   
           <!--[if mso | IE]>
             </td>
           </tr>
         </table>
         
         <table
            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
         >
           <tr>
             <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
         <![endif]-->
   
   
           <div style="Margin:0px auto;max-width:600px;">
   
               <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                   <tbody>
                       <tr>
                           <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                               <!--[if mso | IE]>
                     <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                   
           <tr>
         
               <td
                  style="vertical-align:bottom;width:600px;"
               >
             <![endif]-->
   
                               <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
   
                                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                       <tbody>
                                           <tr>
                                               <td style="vertical-align:bottom;padding:0;">
   
                                                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
   
                                                       <tr>
                                                           <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
   
                                                               <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                  Guerrero Construtora
                                                               </div>
   
                                                           </td>
                                                       </tr>
   
                                                       <tr>
                                                           <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
   
                                                               <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                   <a href="https://guerreropassagens.web.app/" style="color:#575757">guerreropassagens.web.app</a>
                                                               </div>
   
                                                           </td>
                                                       </tr>
   
                                                   </table>
   
                                               </td>
                                           </tr>
                                       </tbody>
                                   </table>
   
                               </div>
   
                               <!--[if mso | IE]>
               </td>
             
           </tr>
         
                     </table>
                   <![endif]-->
                           </td>
                       </tr>
                   </tbody>
               </table>
   
           </div>
   
   
           <!--[if mso | IE]>
             </td>
           </tr>
         </table>
         <![endif]-->
   
   
       </div>
   
   </body>
   
   </html>
   `; 
   const mailOptions = {
    from: "passagens@guerreroservicos.com.br",
    bcc:"passagens@guerreroservicos.com.br",
    to: solicitante,
    subject: `Status do ID ${customKey} foi atualizado para: ${biResult}`, 
    html: sub, // Replace with your email content
  };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.post('/send-email', async (req, res) => {
  try {
    const { customKey, formData, userEmail } = req.body;

    
    function searchPass(userEmail) {
      if (userEmail === process.env.USER_SEND_EMAILA) {
        return process.env.USER_SEND_PASSWORDA;
      } else if (userEmail === process.env.USER_SEND_EMAILB) {
        return process.env.USER_SEND_PASSWORDB;
      } else if (userEmail === process.env.USER_SEND_EMAILC) {
        return process.env.USER_SEND_PASSWORDC;
      } else {
        // Handle the case where the email is not found
        return "Email not found";
      }
    }
    const userPassword = searchPass(userEmail);
      const subject = `Nova solicitação Passagem ID ${customKey}`;
    

if (userEmail) {
  // Use Nodemailer to send the email
  const transporter = nodemailer.createTransport(smtpTransport({
    name: 'hostgator',
    host: 'sh-pro76.hostgator.com.br',
    port: 465,
    secure: true,
    auth: {
      user: userEmail, // Use userEmail directly for 'user' in auth
      pass: userPassword,
    },
  }));
  const formatDate = (dateString) => {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    
    const date = new Date(year, month - 1, day);
    
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    } else {
        return `${date.getDate().toString().padStart(2, '0')}/` +
               `${(date.getMonth() + 1).toString().padStart(2, '0')}/` +
               `${date.getFullYear()}`;
    }
};
  const emailMessage = `
  <!doctype html>
  <html lang="pt-br" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
      <title>
  
      </title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
          #outlook a {
              padding: 0;
          }
  
          .ReadMsgBody {
              width: 100%;
          }
  
          .ExternalClass {
              width: 100%;
          }
  
          .ExternalClass * {
              line-height: 100%;
          }
  
          body {
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
          }
  
          table,
          td {
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
          }
  
          img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
          }
  
          p {
              display: block;
              margin: 13px 0;
          }
      </style>
      <!--[if !mso]><!-->
      <style type="text/css">
          @media only screen and (max-width:480px) {
              @-ms-viewport {
                  width: 320px;
              }
              @viewport {
                  width: 320px;
              }
          }
      </style>
      <!--<![endif]-->
      <!--[if mso]>
          <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
      <!--[if lte mso 11]>
          <style type="text/css">
            .outlook-group-fix { width:100% !important; }
          </style>
          <![endif]-->
  
  
      <style type="text/css">
          @media only screen and (min-width:480px) {
              .mj-column-per-100 {
                  width: 100% !important;
              }
          }
      </style>
  
  
      <style type="text/css">
      </style>
  
  </head>
  
  <body style="background-color:#f9f9f9;">
  
  
      <div style="background-color:#f9f9f9;">
  
  
          <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <![endif]-->
  
  
          <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
  
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                  <tbody>
                      <tr>
                          <td style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                              <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  
          <tr>
        
          </tr>
        
                    </table>
                  <![endif]-->
                          </td>
                      </tr>
                  </tbody>
              </table>
  
          </div>
  
  
          <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <![endif]-->
  
  
          <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
  
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                  <tbody>
                      <tr>
                          <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                              <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  
          <tr>
        
              <td
                 style="vertical-align:top;width:600px;"
              >
            <![endif]-->
  
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
  
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
  
                                      <tr>
                                          <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
  
                                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                  <tbody>
                                                      <tr>
                                                          <td style="width:64px;">
  
                                                              <img height="auto" src="https://i.ibb.co/6wvpQRL/women.jpg" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="64" />
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
  
                                          </td>
                                      </tr>
  
                                      <tr>
                                          <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
  
                                              <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                  Novo Cadastro ID: ${customKey}
                                              </div>
  
                                          </td>
                                      </tr>
  
                                      <tr>
                                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
  
                                              <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                  Olá!<br></br>
                                                  Segue abaixo detalhes do cadastro.<br></br>
                                                  <h4>Dados da Passagem</h4>
                                                  <span style="color: #ba6464;">ID:</span> <span style="color: #333;">${customKey}</span><br>
                                                  <span style="color: #ba6464;">Data Solicitação:</span> <span style="color: #333;">${formData.datasolicitacao ? formatDate(formData.datasolicitacao) : '___'}</span><br>
                                                  <span style="color: #ba6464;">Motivo da viagem:</span> <span style="color: #333;">${formData.motivo}</span><br>
                                                  <span style="color: #ba6464;">Obra/CC:</span> <span style="color: #333;">${formData.diagGroup}</span><br>
                                                  <span style="color: #ba6464;">Status da Passagem:</span> <span style="color: #333;">${formData.biResult}</span><br>
                                                  <span style="color: #ba6464;">Será necessário passagem de volta?</span> <span style="color: #333;">${formData.passvolta}</span><br>
                                                  <span style="color: #ba6464;">Data de Ida:</span> <span style="color: #333;">${formData.dataida ? formatDate(formData.dataida) : '___'}</span><br>
                                                  <span style="color: #ba6464;">Data de Volta:</span> <span style="color: #333;">${formData.datavolta ? formatDate(formData.datavolta) : '___'}</span><br>
                                                  <span style="color: #ba6464;">Cidade Origem:</span> <span style="color: #333;">${formData.cidadeorigem}</span><br>
                                                  <span style="color: #ba6464;">Cidade Destino:</span> <span style="color: #333;">${formData.cidadedestino}</span><br>
                                                  <span style="color: #ba6464;">Solicitado por:</span> <span style="color: #333;">${formData.solicitante}</span><br>
                                                  <span style="color: #ba6464;">Observações:</span> <span style="color: #333;">${formData.firstobs}</span><br>
                                                  <h4>Informações Pessoais</h4>
                                                  <span style="color: #ba6464;">Nome Completo:</span> <span style="color: #333;">${formData.firstName}</span><br>
                                                  <span style="color: #ba6464;">RG:</span> <span style="color: #333;">${formData.firstrg}</span><br>
                                                  <span style="color: #ba6464;">CPF:</span> <span style="color: #333;">${formData.firstcpf}</span><br>
                                                  <span style="color: #ba6464;">Data de Nascimento: </span> <span style="color: #333;">${formData.nascimento ? formatDate(formData.nascimento) : '___'}</span><br>
                                                  <span style="color: #ba6464;">Função:</span> <span style="color: #333;">${formData.funcao}</span><br>
                                                  <h4>Período Baixada</h4>
                                                  <span style="color: #ba6464;">Data de Início: </span> <span style="color: #333;">${formData.datainicio ? formatDate(formData.datainicio) : '___'}</span><br>
                                                  <span style="color: #ba6464;">Data Final:</span> <span style="color: #333;">${formData.datafinal ? formatDate(formData.datafinal) : '___'}</span><br>
                                                  <h4>Transporte Van/Ônibus</h4>
                                                  <span style="color: #ba6464;">Precisa de VAN/ONIBUS em alguma parte do trajeto?</span> <span style="color: #333;">${formData.van}</span><br>
                                                  <span style="color: #ba6464;">Se sim, qual cidade de origem?</span> <span style="color: #333;">${formData.cidadeorigemv}</span><br>
                                                  <span style="color: #ba6464;">Se sim, qual cidade de destino?</span> <span style="color: #333;">${formData.cidadedestinov}</span><br>
                                                  <span style="color: #ba6464;">Será necessário Uber?</span> <span style="color: #333;">${formData.uber}</span><br>
                                                  <h4>Transporte Marítmo</h4>
                                                  <span style="color: #ba6464;">Será necessário transporte marítmo?</span> <span style="color: #333;">${formData.maritmo}</span><br>
                                                  <span style="color: #ba6464;">Se sim, qual cidade de origem?</span> <span style="color: #333;">${formData.cidadeorigemm}</span><br>
                                                  <span style="color: #ba6464;">Se sim, qual cidade de destino?</span> <span style="color: #333;">${formData.cidadedestinom}</span><br>
                                                  <span style="color: #ba6464;">Será necessário Uber?</span> <span style="color: #333;">${formData.uberm}</span><br>
                                      
                                              </div>
  
                                          </td>
                                      </tr>
  
                                      <tr>
                                          <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">
  
                                          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; line-height: 100%;">
                                          <tr>
                                              <td align="center" bgcolor="#2F67F6" role="presentation" style="border: none; border-radius: 3px; color: #ffffff; cursor: auto; padding: 15px 25px;" valign="middle">
                                                  <a href="https://guerreropassagens.web.app/" style="background: #2F67F6; color: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; font-weight: normal; line-height: 120%; Margin: 0; text-decoration: none; text-transform: none; display: inline-block;">
                                                      Visualizar ID no App
                                                  </a>
                                              </td>
                                          </tr>
                                      </table>
                                      
  
                                          </td>
                                      </tr>
  
                                      <tr>
                                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
  
                                              <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;color:#525252;">
                                                  Att. Felipe Santos<br>Departamento de TI<br>
                                                  <a href="guerreroconstrutora.com" style="color:#2F67F6">www.guerreroconstrutora.com</a>
                                              </div>
  
                                          </td>
                                      </tr>
  
                                  </table>
  
                              </div>
  
                              <!--[if mso | IE]>
              </td>
            
          </tr>
        
                    </table>
                  <![endif]-->
                          </td>
                      </tr>
                  </tbody>
              </table>
  
          </div>
  
  
          <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <![endif]-->
  
  
          <div style="Margin:0px auto;max-width:600px;">
  
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                      <tr>
                          <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                              <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  
          <tr>
        
              <td
                 style="vertical-align:bottom;width:600px;"
              >
            <![endif]-->
  
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
  
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                      <tbody>
                                          <tr>
                                              <td style="vertical-align:bottom;padding:0;">
  
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
  
                                                      <tr>
                                                          <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
  
                                                              <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                 Guerrero Construtora
                                                              </div>
  
                                                          </td>
                                                      </tr>
  
                                                      <tr>
                                                          <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
  
                                                              <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                  <a href="https://guerreropassagens.web.app/" style="color:#575757">guerreropassagens.web.app</a>
                                                              </div>
  
                                                          </td>
                                                      </tr>
  
                                                  </table>
  
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
  
                              </div>
  
                              <!--[if mso | IE]>
              </td>
            
          </tr>
        
                    </table>
                  <![endif]-->
                          </td>
                      </tr>
                  </tbody>
              </table>
  
          </div>
  
  
          <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <![endif]-->
  
  
      </div>
  
  </body>
  
  </html>
  `; 
  
  const mailOptions = {
    from: userEmail,
    to: process.env.USER_SEND_EMAILA,
    bcc: userEmail,
    subject: `Nova solicitação Passagem ID ${customKey}`, // Use customKey in the subject
    html: emailMessage, // Use your email content here
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
} else {
  console.error('Current user not found in the list.');
  res.status(404).json({ error: 'Current user not found' });
}
} catch (error) {
console.error('Server error:', error);
res.status(500).json({ error: 'Server error' });
}
});
app.listen(process.env.PORT || 3001);
export default app;
