const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const { fileName, fileContent } = body;

    // Configuração do S3
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    // Parâmetros para armazenar o arquivo no S3
    const params = {
        Bucket: 'seu-bucket-s3',
        Key: fileName,
        Body: Buffer.from(fileContent, 'base64'),
        ContentType: 'image/jpeg',
        ACL: 'public-read', // Permite acesso público
    };

    try {
        const result = await s3.upload(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ imageUrl: result.Location }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao enviar a imagem.' }),
        };
    }
};
