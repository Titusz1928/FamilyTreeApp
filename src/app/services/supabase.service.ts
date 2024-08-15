import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Person } from '../desktop/person';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() { 
    this.supabase = createClient('', '');
  }


  async addPerson(): Promise<void> {
    const { data, error } = await this.supabase
      .from('People') 
      .insert([{ name: 'test' }]);  // Inserts a new row with the name 'test'

    if (error) {
      console.error('Error adding person:', error.message);
    } else {
      console.log('Person added:', data);
    }
  }

  async getPeople(): Promise<Person[]> {
    const { data, error } = await this.supabase
      .from('People')
      .select('*');

    if (error) {
      console.error('Error fetching people:', error.message);
      return [];
    }

    return data as Person[]; // Cast the returned data to an array of Person
  }

}
