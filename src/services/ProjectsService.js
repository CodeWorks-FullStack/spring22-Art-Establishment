import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProjectsService {
  async getAll(){
    const res = await api.get('api/projects')
    logger.log(res.data)
    AppState.projects = res.data
  }

  async getByQuery(params){
    const res = await api.get('api/projects', { params })
    logger.log(res.data)
    AppState.searchResults = res.data
  }

  async createProject(newProj){
    const res = await api.post('api/projects', newProj)
    logger.log(res.data)
    AppState.projects.push(res.data)
  }
}

export const projectsService = new ProjectsService()