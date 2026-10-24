import { messageRepository } from "../repositories/message.repository.js";
import type { CreateContactInput, MessageQuery } from "../schemas/contact.schema.js";
import { ApiError } from "../utils/api-error.js";
import { logger } from "../lib/logger.js";

export const contactService = {
  async submit({ website, ...input }: CreateContactInput) {
    // Bots that fill the honeypot get a normal-looking response but nothing is stored
    if (website) {
      logger.info("Dropped contact message caught by honeypot");
      return null;
    }
    return messageRepository.create(input);
  },

  list(query: MessageQuery) {
    return messageRepository.findMany(query);
  },

  async markRead(id: string, read: boolean) {
    if (!(await messageRepository.findById(id))) throw ApiError.notFound("Message not found");
    return messageRepository.update(id, { read });
  },

  async remove(id: string) {
    if (!(await messageRepository.findById(id))) throw ApiError.notFound("Message not found");
    await messageRepository.delete(id);
  },
};
