import requests
from models import Bible_books, Bible_chapters, Bible_verses
from app import create_app
from extension import db
import time

app = create_app()

# No API key needed!
BASE_URL = "https://bible-api.com"

# Bible book structure (66 books)
BIBLE_BOOKS = [
    # Old Testament
    {"id": "GEN", "name": "Genesis", "chapters": 50},
    {"id": "EXO", "name": "Exodus", "chapters": 40},
    {"id": "LEV", "name": "Leviticus", "chapters": 27},
    {"id": "NUM", "name": "Numbers", "chapters": 36},
    {"id": "DEU", "name": "Deuteronomy", "chapters": 34},
    {"id": "JOS", "name": "Joshua", "chapters": 24},
    {"id": "JDG", "name": "Judges", "chapters": 21},
    {"id": "RUT", "name": "Ruth", "chapters": 4},
    {"id": "1SA", "name": "1 Samuel", "chapters": 31},
    {"id": "2SA", "name": "2 Samuel", "chapters": 24},
    {"id": "1KI", "name": "1 Kings", "chapters": 22},
    {"id": "2KI", "name": "2 Kings", "chapters": 25},
    {"id": "1CH", "name": "1 Chronicles", "chapters": 29},
    {"id": "2CH", "name": "2 Chronicles", "chapters": 36},
    {"id": "EZR", "name": "Ezra", "chapters": 10},
    {"id": "NEH", "name": "Nehemiah", "chapters": 13},
    {"id": "EST", "name": "Esther", "chapters": 10},
    {"id": "JOB", "name": "Job", "chapters": 42},
    {"id": "PSA", "name": "Psalms", "chapters": 150},
    {"id": "PRO", "name": "Proverbs", "chapters": 31},
    {"id": "ECC", "name": "Ecclesiastes", "chapters": 12},
    {"id": "SNG", "name": "Song of Solomon", "chapters": 8},
    {"id": "ISA", "name": "Isaiah", "chapters": 66},
    {"id": "JER", "name": "Jeremiah", "chapters": 52},
    {"id": "LAM", "name": "Lamentations", "chapters": 5},
    {"id": "EZK", "name": "Ezekiel", "chapters": 48},
    {"id": "DAN", "name": "Daniel", "chapters": 12},
    {"id": "HOS", "name": "Hosea", "chapters": 14},
    {"id": "JOL", "name": "Joel", "chapters": 3},
    {"id": "AMO", "name": "Amos", "chapters": 9},
    {"id": "OBA", "name": "Obadiah", "chapters": 1},
    {"id": "JON", "name": "Jonah", "chapters": 4},
    {"id": "MIC", "name": "Micah", "chapters": 7},
    {"id": "NAM", "name": "Nahum", "chapters": 3},
    {"id": "HAB", "name": "Habakkuk", "chapters": 3},
    {"id": "ZEP", "name": "Zephaniah", "chapters": 3},
    {"id": "HAG", "name": "Haggai", "chapters": 2},
    {"id": "ZEC", "name": "Zechariah", "chapters": 14},
    {"id": "MAL", "name": "Malachi", "chapters": 4},
    
    # New Testament
    {"id": "MAT", "name": "Matthew", "chapters": 28},
    {"id": "MRK", "name": "Mark", "chapters": 16},
    {"id": "LUK", "name": "Luke", "chapters": 24},
    {"id": "JHN", "name": "John", "chapters": 21},
    {"id": "ACT", "name": "Acts", "chapters": 28},
    {"id": "ROM", "name": "Romans", "chapters": 16},
    {"id": "1CO", "name": "1 Corinthians", "chapters": 16},
    {"id": "2CO", "name": "2 Corinthians", "chapters": 13},
    {"id": "GAL", "name": "Galatians", "chapters": 6},
    {"id": "EPH", "name": "Ephesians", "chapters": 6},
    {"id": "PHP", "name": "Philippians", "chapters": 4},
    {"id": "COL", "name": "Colossians", "chapters": 4},
    {"id": "1TH", "name": "1 Thessalonians", "chapters": 5},
    {"id": "2TH", "name": "2 Thessalonians", "chapters": 3},
    {"id": "1TI", "name": "1 Timothy", "chapters": 6},
    {"id": "2TI", "name": "2 Timothy", "chapters": 4},
    {"id": "TIT", "name": "Titus", "chapters": 3},
    {"id": "PHM", "name": "Philemon", "chapters": 1},
    {"id": "HEB", "name": "Hebrews", "chapters": 13},
    {"id": "JAS", "name": "James", "chapters": 5},
    {"id": "1PE", "name": "1 Peter", "chapters": 5},
    {"id": "2PE", "name": "2 Peter", "chapters": 3},
    {"id": "1JN", "name": "1 John", "chapters": 5},
    {"id": "2JN", "name": "2 John", "chapters": 1},
    {"id": "3JN", "name": "3 John", "chapters": 1},
    {"id": "JUD", "name": "Jude", "chapters": 1},
    {"id": "REV", "name": "Revelation", "chapters": 22},
]


def fetch_chapter(book_name, chapter_num):
    """Fetch a chapter from bible-api.com"""
    # Format: Genesis 1, John 3, etc.
    url = f"{BASE_URL}/{book_name.replace(' ', '+')}+{chapter_num}"
    
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"  ⚠ Failed to fetch {book_name} {chapter_num}: {response.status_code}")
            return None
    except Exception as e:
        print(f"  ⚠ Error fetching {book_name} {chapter_num}: {e}")
        return None


def populate_bible():
    """Populate the database with Bible content"""
    
    with app.app_context():
        print("=" * 60)
        print("📖 Starting Bible Population (KJV)")
        print("=" * 60)
        
        total_books = len(BIBLE_BOOKS)
        total_chapters = sum(book['chapters'] for book in BIBLE_BOOKS)
        
        print(f"\nBooks to process: {total_books}")
        print(f"Chapters to process: {total_chapters}")
        print("\nThis will take a while. Please be patient...\n")
        
        book_count = 0
        chapter_count = 0
        verse_count = 0
        
        for book_idx, book in enumerate(BIBLE_BOOKS, 1):
            book_id = book['id']
            book_name = book['name']
            num_chapters = book['chapters']
            
            # 1. Add book to database
            existing_book = Bible_books.query.filter_by(id=book_id).first()
            if not existing_book:
                new_book = Bible_books(
                    id=book_id,
                    name=book_name,
                    abbreviation=book_id
                )
                db.session.add(new_book)
                db.session.commit()
                book_count += 1
                print(f"[{book_idx}/{total_books}] ✓ Added Book: {book_name}")
            else:
                print(f"[{book_idx}/{total_books}] ⊙ Book exists: {book_name}")
            
            # 2. Fetch and add chapters
            for chapter_num in range(1, num_chapters + 1):
                chapter_id = f"{book_id}.{chapter_num}"
                
                # Check if chapter exists
                existing_chapter = Bible_chapters.query.filter_by(id=chapter_id).first()
                if existing_chapter:
                    print(f"  ⊙ Chapter {chapter_num} already exists, skipping...")
                    continue
                
                # Fetch chapter data from API
                print(f"  Fetching {book_name} {chapter_num}...")
                chapter_data = fetch_chapter(book_name, chapter_num)
                
                if not chapter_data:
                    continue
                
                # Add chapter
                new_chapter = Bible_chapters(
                    id=chapter_id,
                    books_id=book_id,
                    chapter_number=chapter_num
                )
                db.session.add(new_chapter)
                chapter_count += 1
                
                # 3. Add verses
                verses = chapter_data.get('verses', [])
                
                for verse in verses:
                    verse_num = verse.get('verse')
                    verse_text = verse.get('text', '').strip()
                    verse_id = f"{book_id}.{chapter_num}.{verse_num}"
                    
                    new_verse = Bible_verses(
                        id=verse_id,
                        chapters_id=chapter_id,
                        verse_number=verse_num,
                        text=verse_text
                    )
                    db.session.add(new_verse)
                    verse_count += 1
                
                db.session.commit()
                print(f"  ✓ Added {len(verses)} verses")
                
                # Be nice to the API - small delay
                time.sleep(0.5)
        
        print("\n" + "=" * 60)
        print(" Bible Population Complete!")
        print("=" * 60)
        print(f"Books added: {book_count}")
        print(f"Chapters added: {chapter_count}")
        print(f"Verses added: {verse_count}")
        print("=" * 60)


if __name__ == "__main__":
    try:
        populate_bible()
    except KeyboardInterrupt:
        print("\n\n⚠ Process interrupted by user")
    except Exception as e:
        print(f"\n Error: {e}")
        import traceback
        traceback.print_exc()