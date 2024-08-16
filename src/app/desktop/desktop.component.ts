import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef} from '@angular/core';
import { EditModeService } from '../services/edit-mode.service';
import { SupabaseService } from '../services/supabase.service';  
import { Person } from './person';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'ftapp-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {
  canEdit: boolean = false;
  people: Person[] = [];
  bornThisYear: { person: Person, top: number, left: number }[] = [];

  treeData = [{
    "name": "Niclas Superlongsurname",
    "class": "man",
    "textClass": "emphasis",
    "marriages": [{
      "spouse": {
        "name": "Iliana",
        "class": "woman",
        "extra": {
          "nickname": "Illi"
        }
      },
      "children": [{
        "name": "James",
        "class": "man",
        "marriages": [{
          "spouse": {
            "name": "Alexandra",
            "class": "woman"
          },
          "children": [{
            "name": "Eric",
            "class": "man",
            "marriages": [{
              "spouse": {
                "name": "Eva",
                "class": "woman"
              }
            }]
          }, {
            "name": "Jane",
            "class": "woman"
          }, {
            "name": "Jasper",
            "class": "man"
          }, {
            "name": "Emma",
            "class": "woman"
          }, {
            "name": "Julia",
            "class": "woman"
          }, {
            "name": "Jessica",
            "class": "woman"
          }]
        }]
      }]
    }]
  }];


  oldestYear: number = 1800;
  displayedYear: number = 0;
  currentYear:number=0;
  intervalId: any = null;

  // Slider properties
  slider_disabled = false;
  slider_max = 10;
  slider_min = 1;
  slider_step = 1;
  slider_value = 1;

  messages: string[] = [];


  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild('scrollableCard') private scrollableCard!: ElementRef;

  constructor(
    private editModeService: EditModeService,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef for manual change detection
  ) {}

  ngOnInit(): void {
    this.editModeService.canEdit$.subscribe(value => {
      this.canEdit = value;
      console.log('canEdit in DesktopComponent:', this.canEdit);
    });

    // Set the current year
    this.currentYear = new Date().getFullYear();
    this.displayedYear=this.currentYear;
    console.log("Setting displayedYear to:", this.displayedYear);

    this.loadPeople(); // Ensure this method is called

    this.loadTree(1000);
  }


  async loadPeople(): Promise<void> {
    try {
      this.people = await this.supabaseService.getPeople(); // Fetch people data
      this.sortPeopleByBirthYear();
      console.log('People loaded in DesktopComponent:', this.people);
      this.loadOldestYear();

      // Notify Angular of changes to trigger re-render
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading people:', error);
    }
  }

  sortPeopleByBirthYear(): void {
    this.people.sort((a, b) => a.birthyear - b.birthyear);
}

  loadOldestYear(): void {
    if (this.people.length === 0) {
      console.log("No people in the array.");
      return;
    }
  
    let oldestYear = this.people[0].birthyear;
  
    // Iterate through the array
    for (let person of this.people) {
      if (person.birthyear < oldestYear) {
        oldestYear = person.birthyear;
      }
    }
  
    // Update the component's property
    this.oldestYear = oldestYear;

    console.log("Oldest birth year:", this.oldestYear);
  }

  async addPerson(): Promise<void> {
    if (this.canEdit) {
      await this.supabaseService.addPerson();
    } else {
      console.log('Editing is not allowed.');
    }
  }

  birthEvents: { name: string, birthyear: number }[] = [];

  loadTree(loadSpeed: number): void {
    this.messages = [];
    this.displayedYear = this.oldestYear;
    this.birthEvents = [];
    
    if (this.intervalId) {
      return;
    }
  
    this.intervalId = setInterval(() => {
      if (this.displayedYear >= new Date().getFullYear()) {
        this.stopLoading();
      } else {
        for (let person of this.people) {
          if (this.displayedYear === person.birthyear) {
            this.messages.push(`${person.name} was born (${this.displayedYear})`);
            
            // Instead of just pushing, create a new array reference
            this.birthEvents = [...this.birthEvents, { name: person.name, birthyear: person.birthyear }];
          }
  
          if (this.displayedYear === person.weddingyear) {
            const partner = this.people.find(p => p.id_person === person.id_partner);
            if (partner) {
              this.messages.push(`${person.name} got married with ${partner.name} (${this.displayedYear})`);
            }
          }
        }
        this.displayedYear++;
        this.cdr.detectChanges(); // Update the view
      }
    }, 1000 / loadSpeed);
  }
  

  stopLoading(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("Tree loading stopped.");
    }
  }

  revertLoading(): void {
    this.stopLoading();
    // Immediately jump to the current year by using the loadTree function
    this.loadTree(1000);
    this.cdr.detectChanges(); // Ensure the view is updated
  }

  private scrollToBottom(): void {
    try {
      this.scrollableCard.nativeElement.scrollTop = this.scrollableCard.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scrolling failed', err);
    }
  }
}