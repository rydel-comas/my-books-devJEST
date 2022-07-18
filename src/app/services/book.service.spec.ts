import {BookService} from './book.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {Book} from '../models/book.model';
import {environment} from '../../environments/environment';
import swal from "sweetalert2";

const listBook: Book[] = [
  {id: '12', name: '', author: '', isbn: '', price: 15, amount: 2},
  {id: '13', name: '', author: '', isbn: '', price: 20, amount: 1},
  {id: '14', name: '', author: '', isbn: '', price: 8, amount: 7},
];

const book: Book = {id: '12', name: '', author: '', isbn: '', price: 15, amount: 2};

const newBook: Book = {id: '14', name: '', author: '', isbn: '', price: 15, amount: 0};

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let storage = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
    storage = {};
    jest.spyOn(localStorage, 'getItem').mockImplementation((key: string) => {
      return storage[key] ? storage[key] : null;
    });

    jest.spyOn(localStorage , 'setItem').mockImplementation((key: string, value: string) => {
      return storage[key] = value;
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getBook return a list of book and does and get method', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listBook);
    });

    const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toBe('GET');
    req.flush(listBook);
  });

  it('getBooksFromCart return empty array when localStorage is empty', () => {
    const listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });

  it('addBookToCart add a book correctly when the list does not exist in the localStorage', () => {
    const toast = {
      fire: () => null,
    } as any;

    const spy1 = jest.spyOn(swal, 'mixin').mockImplementation(() => {
      return toast;
    });
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
    service.addBookToCart(book);
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    expect(spy1).toHaveBeenCalled();
  });

  it('removeBooksFromCart removes the list from the localStorage', () => {
    service.addBookToCart(book);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    service.removeBooksFromCart();
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });

  it('updateAmountBook add new amount to book', ()=>{
     const spy = jest.spyOn(service, 'getBooksFromCart').mockImplementation(()=> listBook);
     const resp = service.updateAmountBook(book);
     expect(spy).toHaveBeenCalled();
     expect(resp[0]?.amount).toBe(1);
  })

  it('updateAmountBook add new amount to book to equal 0', ()=>{
    const spy = jest.spyOn(service, 'getBooksFromCart').mockImplementation(()=> listBook);
    const resp = service.updateAmountBook(newBook);
    expect(spy).toHaveBeenCalled();
    expect(resp.length).toBe(2);
 })
 
});