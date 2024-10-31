// lib/logger.ts

import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logLevel = process.env.NODE_ENV === "production" ? "error" : "debug";

// Create a Winston logger instance
const logger = createLogger({
  level: logLevel,
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    // Console transport for local development
    new transports.Console(),

    // Daily rotate file transport for saving logs to files
    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d", // Retain logs for 14 days
    }),

    // CloudWatch transport (optional, for production)
    // new WinstonCloudWatch({
    //   logGroupName: process.env.CLOUDWATCH_GROUP,
    //   logStreamName: process.env.CLOUDWATCH_STREAM,
    //   awsRegion: process.env.AWS_REGION,
    // }),
  ],
});

export default logger;
