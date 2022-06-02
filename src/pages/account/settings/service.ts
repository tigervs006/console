import { request } from 'umi';
import type { CurrentUser, GeographicItemType } from './data';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/account/settings');
}

export async function queryProvince(): Promise<{ data: GeographicItemType[] }> {
  return request('/account/province');
}

export async function queryCity(province: string): Promise<{ data: GeographicItemType[] }> {
  return request(`/account/city?code=${province}`);
}
