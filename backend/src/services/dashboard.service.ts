import { certificateRepository } from "../repositories/certificate.repository.js";
import { messageRepository } from "../repositories/message.repository.js";
import { projectRepository } from "../repositories/project.repository.js";

export const dashboardService = {
  async getStats() {
    const [projectsByType, certificates, unreadMessages] = await Promise.all([
      projectRepository.countByType(),
      certificateRepository.count(),
      messageRepository.countUnread(),
    ]);
    const byType = Object.fromEntries(projectsByType.map((row) => [row.type, row._count._all]));
    return {
      projects: {
        total: projectsByType.reduce((sum, row) => sum + row._count._all, 0),
        byType,
      },
      certificates,
      unreadMessages,
    };
  },
};
