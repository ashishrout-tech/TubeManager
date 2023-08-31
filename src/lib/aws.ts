import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESSKEYID!,
        secretAccessKey: process.env.SECRETACCESSKEY!
    }
})

export async function getObjectURL(key?: string) {
    try {
        const command = new GetObjectCommand({
            Bucket: "ashishrout.tech.youtube",
            Key: key
        })
    
        const url = await getSignedUrl(s3Client, command)
        return url;
    } catch (error) {
        throw new Error("AWS Client Error");
    }
}