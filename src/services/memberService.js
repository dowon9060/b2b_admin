import httpClient, { API_ENDPOINTS } from './httpClient';

class MemberService {
  // 구성원 목록 조회
  async getMembers(params = {}) {
    try {
      return await httpClient.get(API_ENDPOINTS.MEMBERS.LIST, params);
    } catch (error) {
      console.error('Get members failed:', error);
      throw error;
    }
  }

  // 구성원 상세 조회
  async getMember(id) {
    try {
      return await httpClient.get(API_ENDPOINTS.MEMBERS.DETAIL(id));
    } catch (error) {
      console.error('Get member failed:', error);
      throw error;
    }
  }

  // 구성원 생성
  async createMember(memberData) {
    try {
      return await httpClient.post(API_ENDPOINTS.MEMBERS.CREATE, memberData);
    } catch (error) {
      console.error('Create member failed:', error);
      throw error;
    }
  }

  // 구성원 수정
  async updateMember(id, memberData) {
    try {
      return await httpClient.put(API_ENDPOINTS.MEMBERS.UPDATE(id), memberData);
    } catch (error) {
      console.error('Update member failed:', error);
      throw error;
    }
  }

  // 구성원 삭제
  async deleteMember(id) {
    try {
      return await httpClient.delete(API_ENDPOINTS.MEMBERS.DELETE(id));
    } catch (error) {
      console.error('Delete member failed:', error);
      throw error;
    }
  }

  // 구성원 일괄 등록
  async bulkCreateMembers(membersData) {
    try {
      return await httpClient.post(`${API_ENDPOINTS.MEMBERS.CREATE}/bulk`, membersData);
    } catch (error) {
      console.error('Bulk create members failed:', error);
      throw error;
    }
  }

  // 구성원 검색
  async searchMembers(searchParams) {
    try {
      return await httpClient.get(`${API_ENDPOINTS.MEMBERS.LIST}/search`, searchParams);
    } catch (error) {
      console.error('Search members failed:', error);
      throw error;
    }
  }
}

export default new MemberService();














