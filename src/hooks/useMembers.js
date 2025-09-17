import { useState, useEffect } from 'react';
import { useApi } from '../context/ApiContext';

export const useMembers = () => {
  const { getMembers, createMember, updateMember, deleteMember, isLoading, error } = useApi();
  const [members, setMembers] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // 구성원 목록 조회
  const fetchMembers = async (params = {}) => {
    try {
      const data = await getMembers(params);
      setMembers(data.members || data);
      return data;
    } catch (error) {
      console.error('Failed to fetch members:', error);
      throw error;
    }
  };

  // 구성원 추가
  const addMember = async (memberData) => {
    try {
      const newMember = await createMember(memberData);
      setMembers(prev => [...prev, newMember]);
      return newMember;
    } catch (error) {
      console.error('Failed to add member:', error);
      throw error;
    }
  };

  // 구성원 수정
  const editMember = async (id, memberData) => {
    try {
      const updatedMember = await updateMember(id, memberData);
      setMembers(prev => prev.map(m => m.id === id ? updatedMember : m));
      return updatedMember;
    } catch (error) {
      console.error('Failed to update member:', error);
      throw error;
    }
  };

  // 구성원 삭제
  const removeMember = async (id) => {
    try {
      await deleteMember(id);
      setMembers(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error('Failed to delete member:', error);
      throw error;
    }
  };

  // 구성원 검색/필터링
  const filterMembers = (searchParams) => {
    const { search, department, startDate, endDate } = searchParams;
    
    return members.filter(member => {
      let matches = true;
      
      if (search && !member.name.includes(search)) {
        matches = false;
      }
      
      if (department && department !== '전체' && member.department !== department) {
        matches = false;
      }
      
      if (startDate && member.joinDate < startDate) {
        matches = false;
      }
      
      if (endDate && member.joinDate > endDate) {
        matches = false;
      }
      
      return matches;
    });
  };

  // 초기 데이터 로드
  useEffect(() => {
    if (!initialized) {
      fetchMembers().finally(() => setInitialized(true));
    }
  }, [initialized]);

  return {
    members,
    isLoading,
    error,
    fetchMembers,
    addMember,
    editMember,
    removeMember,
    filterMembers,
    initialized
  };
};














