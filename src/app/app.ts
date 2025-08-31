import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements AfterViewInit {
  isLoading: boolean = true;
  progress: number = 0;
  showIntro: boolean = false;
  showContent: boolean = false;

  activeSection: string = 'home';

  movies = [
    {
      id: 1,
      title: 'Inception',
      year: 2010,
      director: 'Christopher Nolan',
      rating: 8.8,
      duration: '2h 28m',
      genre: 'Sci-Fi, Action',
      description:
        'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.ZFII9D-wnbPdcWdzFeuEiAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
      budget: '$160 million',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      year: 2008,
      director: 'Christopher Nolan',
      rating: 9.0,
      duration: '2h 32m',
      genre: 'Action, Crime, Drama',
      description:
        'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      image:
        'https://m.media-amazon.com/images/S/pv-target-images/e9a43e647b2ca70e75a3c0af046c4dfdcd712380889779cbdc2c57d94ab63902.jpg',
      cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
      budget: '$185 million',
    },
    {
      id: 3,
      title: 'Interstellar',
      year: 2014,
      director: 'Christopher Nolan',
      rating: 8.6,
      duration: '2h 49m',
      genre: 'Adventure, Drama, Sci-Fi',
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      image: 'https://m.media-amazon.com/images/I/9126RvjPNwL._SL1500_.jpg',
      cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
      budget: '$165 million',
    },
    {
      id: 4,
      title: 'The Shawshank Redemption',
      year: 1994,
      director: 'Frank Darabont',
      rating: 9.3,
      duration: '2h 22m',
      genre: 'Drama',
      description:
        'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      image:
        'https://th.bing.com/th/id/R.ce27cf7585988782c7ba9361c2e99726?rik=HP1%2fGpLAsiuV7A&riu=http%3a%2f%2fimages1.fanpop.com%2fimages%2fphotos%2f2300000%2fThe-Shawshank-Redemption-the-shawshank-redemption-2333679-600-849.jpg&ehk=RGRIg5evgVb%2fHKuBsfgFjPLP1ihqogfpl5%2fST06u2lk%3d&risl=&pid=ImgRaw&r=0',
      cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
      budget: '$25 million',
    },
    {
      id: 5,
      title: 'Pulp Fiction',
      year: 1994,
      director: 'Quentin Tarantino',
      rating: 7.9,
      duration: '2h 34m',
      genre: 'Crime, Drama',
      description:
        'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      image:
        'https://th.bing.com/th/id/R.527424edce1b68aef9f0825d787c2bc1?rik=oQ8GQmxc%2btmyvQ&pid=ImgRaw&r=0',
      cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
      budget: '$8 million',
    },
    {
      id: 6,
      title: 'The Godfather',
      year: 1972,
      director: 'Francis Ford Coppola',
      rating: 9.2,
      duration: '2h 55m',
      genre: 'Crime, Drama',
      description:
        'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      image:
        'https://tse3.mm.bing.net/th/id/OIP._5fxLczZe-Orf76zbPUWSAHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
      budget: '$6 million',
    },
    {
      id: 7,
      title: 'Fight Club',
      year: 1999,
      director: 'David Fincher',
      rating: 8.8,
      duration: '2h 19m',
      genre: 'Drama',
      description:
        'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
      image:
        'https://tse2.mm.bing.net/th/id/OIP.q9fgNTN-dv9dLVr4F4yyvwHaKe?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      cast: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter'],
      budget: '$63 million',
    },
    {
      id: 8,
      title: 'Forrest Gump',
      year: 1994,
      director: 'Robert Zemeckis',
      rating: 8.8,
      duration: '2h 22m',
      genre: 'Drama, Romance',
      description:
        'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.',
      image:
        'https://image.tmdb.org/t/p/original/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
      cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
      budget: '$55 million',
    },
    {
      id: 9,
      title: 'The Matrix',
      year: 1999,
      director: 'Lana & Lilly Wachowski',
      rating: 8.7,
      duration: '2h 16m',
      genre: 'Action, Sci-Fi',
      description:
        'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      image:
        'https://tse1.mm.bing.net/th/id/OIP.8n3V_HSzCyYRZJ51mD8YNAHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
      budget: '$63 million',
    },
    {
      id: 10,
      title: 'Goodfellas',
      year: 1990,
      director: 'Martin Scorsese',
      rating: 8.7,
      duration: '2h 26m',
      genre: 'Biography, Crime, Drama',
      description:
        'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.QkqTEs58QAGt2lOdEh5f9wAAAA?r=0&w=350&h=504&rs=1&pid=ImgDetMain&o=7&rm=3',
      cast: ['Robert De Niro', 'Ray Liotta', 'Joe Pesci'],
      budget: '$25 million',
    },
    {
      id: 11,
      title: 'The Lord of the Rings: The Fellowship',
      year: 2001,
      director: 'Peter Jackson',
      rating: 8.8,
      duration: '2h 58m',
      genre: 'Adventure, Drama, Fantasy',
      description:
        'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
      image:
        'https://th.bing.com/th/id/R.15efb377ba5dee52a7c1d05ab80dbc51?rik=6A0yhxCGb86f3A&pid=ImgRaw&r=0',
      cast: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom'],
      budget: '$93 million',
    },
    {
      id: 12,
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
      director: 'Irvin Kershner',
      rating: 8.7,
      duration: '2h 4m',
      genre: 'Action, Adventure, Fantasy',
      description:
        'After the Rebels are overpowered by the Empire, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader.',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.3zfF5GsUznh1SUNPNx34KwHaLj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      cast: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher'],
      budget: '$30 million',
    },
    {
      id: 13,
      title: 'The Avengers',
      year: 2012,
      director: 'Joss Whedon',
      rating: 8.0,
      duration: '2h 23m',
      genre: 'Action, Adventure, Sci-Fi',
      description:
        "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
      image:
        'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/03/the-avengers-2012-poster.jpg',
      cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
      budget: '$220 million',
    },
    {
      id: 14,
      title: 'Parasite',
      year: 2019,
      director: 'Bong Joon Ho',
      rating: 8.6,
      duration: '2h 12m',
      genre: 'Comedy, Drama, Thriller',
      description:
        'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
      image:
        'https://fr.web.img6.acsta.net/pictures/20/02/12/13/58/3992754.jpg',
      cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
      budget: '$11 million',
    },
    {
      id: 15,
      title: 'The Silence of the Lambs',
      year: 1991,
      director: 'Jonathan Demme',
      rating: 8.6,
      duration: '1h 58m',
      genre: 'Crime, Drama, Thriller',
      description:
        'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
      image:
        'https://tse1.mm.bing.net/th/id/OIP.czQiT2NHPUsxZPpyWiPVvwHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      cast: ['Jodie Foster', 'Anthony Hopkins', 'Lawrence A. Bonney'],
      budget: '$19 million',
    },
    {
      id: 16,
      title: 'Gladiator',
      year: 2000,
      director: 'Ridley Scott',
      rating: 8.5,
      duration: '2h 35m',
      genre: 'Action, Adventure, Drama',
      description:
        'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
      image:
        'https://th.bing.com/th/id/R.c60f1eab682a86321b0762a57fc53deb?rik=D%2bVMfqbFyp9Ehg&pid=ImgRaw&r=0',
      cast: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'],
      budget: '$103 million',
    },
    {
      id: 17,
      title: 'The Departed',
      year: 2006,
      director: 'Martin Scorsese',
      rating: 8.5,
      duration: '2h 31m',
      genre: 'Crime, Drama, Thriller',
      description:
        'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.',
      image:
        'https://th.bing.com/th/id/R.ab500ab3acd521c987ba9acddeab4981?rik=1ysKCHPhNNooZg&pid=ImgRaw&r=0',
      cast: ['Leonardo DiCaprio', 'Matt Damon', 'Jack Nicholson'],
      budget: '$90 million',
    },
    {
      id: 18,
      title: 'The Prestige',
      year: 2006,
      director: 'Christopher Nolan',
      rating: 8.5,
      duration: '2h 10m',
      genre: 'Drama, Mystery, Thriller',
      description:
        'After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.',
      image:
        'https://image.tmdb.org/t/p/original/Ag2B2KHKQPukjH7WutmgnnSNurZ.jpg',
      cast: ['Christian Bale', 'Hugh Jackman', 'Scarlett Johansson'],
      budget: '$40 million',
    },
    {
      id: 19,
      title: 'The Lion King',
      year: 1994,
      director: 'Roger Allers, Rob Minkoff',
      rating: 8.5,
      duration: '1h 28m',
      genre: 'Animation, Adventure, Drama',
      description:
        'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
      image:
        'https://tse4.mm.bing.net/th/id/OIP.aEI6WJ22i4HYARFJ1OLyFgHaKT?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      cast: ['Matthew Broderick', 'Jeremy Irons', 'James Earl Jones'],
      budget: '$45 million',
    },
    {
      id: 20,
      title: 'Avengers: Endgame',
      year: 2019,
      director: 'Anthony & Joe Russo',
      rating: 4.4,
      duration: '3h 1m',
      genre: 'Action, Adventure, Drama',
      description:
        'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.',
      image:
        'https://th.bing.com/th/id/R.16c9bd0c9d395173d0f176f26ad99c41?rik=AsZELirSLdSu5Q&pid=ImgRaw&r=0',
      cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
      budget: '$356 million',
    },
  ];

  selectedMovie: any = null;
  isModalOpen: boolean = false;

  constructor(private ngZone: NgZone) {}

  async ngAfterViewInit() {
    await this.showLoading();
    await this.showIntroSection();
    this.showContent = true;
    this.animateBackground();
  }

  private async showLoading() {
    for (let i = 0; i <= 100; i++) {
      await this.delay(20);
      this.progress = i;
    }
    this.isLoading = false;
  }

  private async showIntroSection() {
    this.showIntro = true;
    await this.delay(3500);
    this.showIntro = false;
  }

  private animateBackground() {
    const container = document.querySelector('.background-animation');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = 2 + Math.random() * 3 + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.animationDuration = 5 + Math.random() * 10 + 's';
      container.appendChild(particle);
    }

    for (let i = 0; i < 10; i++) {
      const line = document.createElement('div');
      line.className = 'floating-line';
      line.style.left = Math.random() * 100 + '%';
      line.style.top = Math.random() * 100 + '%';
      line.style.transform = `rotate(${Math.random() * 360}deg)`;
      line.style.animationDelay = Math.random() * 3 + 's';
      line.style.animationDuration = 8 + Math.random() * 12 + 's';
      container.appendChild(line);
    }
  }

  openMovieModal(movie: any) {
    this.selectedMovie = movie;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedMovie = null;
  }

  getRatingClass(rating: number): string {
    if (rating >= 9.0) return 'excellent';
    if (rating >= 8.0) return 'great';
    if (rating >= 7.0) return 'good';
    if (rating >= 6.0) return 'average';
    return 'poor';
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
