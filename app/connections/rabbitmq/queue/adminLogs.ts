
/**
 * Test queue in RabbitMQ
 */
import rabbitmq from '../rabbitmq';
const routingQueueKey = process.env.ADMIN_LOG_QUEUE

/**
 * for publishing data
 * @param {object} msg
 */
const publish = async (msg) => {
  rabbitmq.getRabbitmqInstance().publish(rabbitmq.getChannel(), routingQueueKey, msg)
}

export default { publish };
