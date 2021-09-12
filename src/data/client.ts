import aws from 'aws-sdk';
import config from '../config';

aws.config.update({region: config.region});

const client = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

export { client };
