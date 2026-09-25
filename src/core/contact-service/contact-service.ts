import { inject, Service } from '@angular/core';
import { Contact } from '../../features/contact-feature/contact.model';
import { API_URL } from '../models';
import { CreateContact } from '../../features/contact-feature/create-contact.model';
import { HttpClient } from '@angular/common/http';

@Service()
export class ContactService {


private http = inject(HttpClient);

  findAll() {
    return this.http.get<Contact[]>(`${API_URL}/contact`);
  }

  findOne(id: number) {
    return this.http.get<Contact>(`${API_URL}/contact/${id}`);
  }

  create(item: CreateContact) {
    return this.http.post<Contact>(`${API_URL}/contact`, item);
  }

  update(id: number,value : string) {
    return this.http.put<Contact>(`${API_URL}/contact/${id}`,value);
  }

  remove(id: number) {
    return this.http.delete(`${API_URL}/contact/${id}`);
  }
}
