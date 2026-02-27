import api from '../../../core/interceptors/auth.interceptor'
import type { StatisticsSummary } from '../types/statistics.type'

const StatisticsService = {
  getSummary: async (): Promise<StatisticsSummary> => {
    const { data } = await api.get('/statistics/summary')
    return data.data.summary
  },
}

export default StatisticsService
