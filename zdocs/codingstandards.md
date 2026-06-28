# TypeScript / Angular Style Guide

| Symbol | Meaning |
|--------|---------|
| ❌ | Do not do this |
| ✅ | Do this |

---

## Empty Length Check

```ts
// do not do this ❌
if (data.length > 0) { ... }

// do this ✅
if (data.length) { ... }
```

Falsy values, including `0`, evaluate to `false` in boolean contexts, while truthy values evaluate to `true`. This allows for concise conditional statements like `if (data.length)` to check if `data.length` is not `0`.

---

## One-Liner If/Else's

```ts
// do not do this ❌
// Possible one liner if statement
if (mycondition_is_just_one_block) {
    this.callAMethod();
}

// One liner if/else statement
if (mycondition_is_just_one_block) {
    return false;
} else {
    this.callMethod();
}

// do this ✅
if (mycondition_is_just_one_block) return;
if (mycondition_is_just_one_block) return false;
else this.callMethod();
```

Simpler and fewer lines — this is optional.

---

## Simplify and Reduce the Usage of Curly Braces

```ts
// do not do this ❌
private methodName() {
    if (myCondition) {
        doThis...
        doThat...
    } else {
        doThis1...
        doThat...
    }
}

// do this ✅
private methodName() {
    if (myCondition) {
        doThis...
        doThat...
        return;
    }
    doThis1...
    doThat...
}
```

If `myCondition` is true, the method will execute `doThis` and `doThat`, then immediately return, skipping the remaining code. If `myCondition` is false, it will proceed to execute `doThis1` and `doThat`. This eliminates the need for the `else` block and reduces the number of curly braces.

---

## Declare Access Modifiers

```ts
// do not do this ❌
getTotalPlaylist() { ... }

// do this ✅
private|public getTotalPlaylist() { ... }
```

Introducing the `private` or `public` keywords aids in discerning whether a method is exclusively accessed within the TypeScript scope or utilized within the HTML context.

---

## Avoid Usage of `object` or `any`

```ts
// do not do this ❌
variableOne: any = {
    firstname: 'Test',
    lastname: 'Testing',
    age: 9
}
variableTwo: object = {
 ...
}
variableThree: any[] = [
  {...}
]

// do this ✅
// Create an interface
export interface Person {
    firstname: string,
    lastname: string,
    age: number
}

// Use it on your variable
variableOne: Person = {
    firstname: 'Test',
    lastname: 'Testing',
    age: 9
}
```

By explicitly typing `variableOne` with the `Person` interface, you ensure that it adheres to the specified structure, avoiding the usage of `any` and providing type safety throughout your codebase.

---

## Class Parameters

```ts
// do not do this ❌
export class Person {
  firstname: string;
  lastname: string;
  age: number
  constructor(firstname: string, lastname: string, age: number) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.age = age;
  }
}
```

When instantiated, we need to follow the order of parameters declared via the constructor. This might be difficult for classes with a large number of parameters:

```ts
const person1 = new Person('Kumiko', 'Yamaguchi', 25);
```

```ts
// do this ✅
export class Person {
  firstname: string;
  lastname: string;
  age: number
  constructor(p: {firstname: string, lastname: string, age: number}) {
      this.firstname = p.firstname;
      this.lastname = p.lastname;
      this.age = p.age;
  }
}
```

When instantiated, it is required to add in the property name, but with this approach we no longer need to follow the parameter order set via the constructor. This helps a lot, especially for classes that have a large number of parameters:

```ts
const person1 = new Person({
    age: 0,
    firstname: 'Kumiko',
    lastname: 'Yamaguchi'
})
```

**"Do" approach:** The constructor accepts a single parameter, `p`, containing `firstname`, `lastname`, and `age` properties. Instantiating the `Person` class involves providing an object with these properties, allowing for flexibility and clearer code, particularly with a large number of parameters or when their order isn't intuitive. This approach also facilitates easy parameter expansion without disrupting existing instantiations.

---

## Constant File Usage

**`single-playlist-v2.component.html`: hard-coding static texts**

```html
<!-- do not do this ❌ -->
<div class="playlist-settings d-flex">
  <button
     mat-button
     mat-raised-button
     class="theme-btn mr-2"
     (click)="playlistSettingClicked(edit)">
     <i class="fas fa-edit text-green mr-3"></i>
     <small class="font-weight-bold">Edit</small>
  </button>
  <button
     mat-button
     mat-raised-button
     class="theme-btn mr-2"
     (click)="playlistSettingClicked(clone)">
     <i class="fas fa-copy text-green mr-3"></i>
     <small class="font-weight-bold">Clone</small>
  </button>
  <button
     mat-button
     mat-raised-button
     class="theme-btn mr-2"
     (click)="playlistSettingClicked(push-updates)">
     <i class="fas fa-upload text-green mr-3"></i>
     <small class="font-weight-bold">Push Updates</small>
  </button>
</div>
```

**`PlaylistSetting.ts` (constant file)**

```ts
// do this ✅
export const PLAYLIST_SETTING_BUTTONS = [
    {
        label: 'Edit',
        action: PLAYLIST_SETTING_ACTIONS.edit,
        icon: 'fas fa-edit',
    },
    {
        label: 'Clone',
        action: PLAYLIST_SETTING_ACTIONS.clone,
        icon: 'fas fa-copy',
    },
    {
        label: 'Push Updates',
        action: PLAYLIST_SETTING_ACTIONS.pushUpdates,
        icon: 'fas fa-upload',
    },
];
```

**`single-playlist-v2.component.ts`: import the constant file and instantiate**

```ts
import { PLAYLIST_SETTING_BUTTONS } from './constants';

export class SinglePlaylistV2Component {
    playlistSettings = PLAYLIST_SETTING_BUTTONS;
    ...
}
```

**`single-playlist-v2.component.html`: make use of the variable stored**

```html
<div class="playlist-settings d-flex">
    <button
      *ngFor="let p of playlistSettings"
      mat-button
      mat-raised-button
      class="theme-btn mr-2"
      (click)="playlistSettingClicked(p.action)">
      <i class="{{ p.icon }} text-green mr-3"></i>
       <small class="font-weight-bold">{{ p.label }}</small>
    </button>
</div>
```

To eliminate hard-coding static texts, make use of a constants file to contain these values in a single file.

This can then be reused for other components just by importing the constants file.

Other examples include messages from pop-ups.

---

## Use `const` or `let` When Declaring Variables

```ts
// do not do this ❌
var playlistContents = [];
var totalContentCount = 10;

// do this ✅
let playlistContents = [];
const totalContentCount = 10;
```

Do use `const` or `let` when declaring variables. Avoid using `var` because its scope is uncertain, which sometimes causes unpredictable results. The value gets overwritten if you declare it in a different scope.

`const` and `let`, on the other hand, are block-scoped, which already sets boundaries. These are then bound to their specific scopes.

Also, as much as possible, try to use `const` unless the value of the variable is dynamic or gets reassigned frequently.

---

## Variable Naming

```ts
// do not do this ❌
export class AppComponent {
  // using Camel Case on variables with decorators
  @Input() playlistContents = [];
  // vague or unclear naming
  d_admin = new DealerAdmin();
  // using both Snake Case and Camel Case
  is_dealerAdmin = false;
  // inaccurate variable name
  // this is clearly an array of IDs and not dealers
  dealers = [ 'asd11e123', 'czc2123', 'dasd312' ];
  // not using the proper Camel Case
  userID = 'asdas123123asdf414df';
  // not using the '_' prefix
  constructor(private dealerService: DealerService) {
    ...
  }
}

// do this ✅
export class AppComponent {
  // use snake_case on variables with decorators
  @Input() playlist_contents = [];
  // use camelCase on variables with no decorators
  dealerAdmin = new DealerAdmin();
  // use only one case on a variable
  isDealerAdmin = false;
  // use explicit naming
  dealerIds = [ 'asd11e123', 'czc2123', 'dasd312' ];
  // proper use of camelCase
  userId = 'asdas123123asdf414df';
  // always prefix service variables with an '_'
  constructor(private _dealer: DealerService) {
    ...
  }
}
```

Do use proper cases and explicit naming on variables.

- For variables using decorators such as `@Input` or `@Output`, use `snake_case`.
- All other variable names should use `camelCase`.
- Service variables should have the `_` prefix and should only be named after the module/context it is for. For example, `_dealer: DealerService`.
- Also ensure that your variable names are explicit, or accurately describe the data in the variable. This is to prevent confusion and to promote readability.

---

## Variable Declaration

```ts
// do not do this ❌
name = "";
age: number;

// do this ✅
/** JSDOC **/
public name: string = "";
/** JSDOC **/
public age: number = 1;
```

---

## Function Naming

```ts
// do not do this ❌
export class AppComponent {
  ...
  // using mixed cases
  get_dealerData(): DealerData[] {
    ...
  }
  // inaccurate function naming
  // this clearly returns deal
  getDealer(): string {
    const dealerIds = ['1', '2', '3'];
    return dealerIds.filter(x => x === '1');
  }
  // using Snake Case
  private async export_dealer_data(): void {
    ...
  }
}

// do this ✅
export class AppComponent {
  ...
  // using mixed cases
  getDealerData(): DealerData[] {
    ...
  }
  // inaccurate function naming
  // this clearly returns deal
  getDealerIds(): string {
    const dealerIds = ['1', '2', '3'];
    return dealerIds.filter(x => x === '1');
  }
  // use Camel Case
  private async exportDealerData(): void {
    ...
  }
}
```

Do use proper cases and explicit naming on functions.

- `camelCase` should be used for all function names, including arrow functions.
- Also ensure accurate and explicit naming on functions so as to avoid confusion and to make the code readable.

---

## Declare Default Variable Values

```ts
// do not do this ❌
let title: string = '';
let age: number = 18;
let dealer: Dealer = new Dealer();

// do this ✅
let title = '';
let age = 18;
let dealer = new Dealer();
```

Do declare initial values for all variables, especially variables that are used to hold values of a specific data type.

If it is difficult to initially assign a value to a variable, then make sure to indicate a type on the variable — especially if it gets assigned `null` or `undefined`.

Furthermore, in most cases, there is no need to declare the variable type if the value being assigned to it is a primitive data type.

---

## Consistent Primitive Data Typing

```ts
// do not do this ❌
let page: number|string;
page = 2;
page = '3';

// do this ✅
let page: number;
page = 2;
page = 3;
```

As much as possible, use one primitive data type on a variable. This is to avoid confusion, particularly in creating tests or checks on said variable.

---

## Declare Function Return Types

```ts
// do not do this ❌
getDealers(dealerId: string){
  let data: Dealers[] = [];
  ...
  return data;
}
...
private getDealerByName(name: string) {
  let data = new Dealer();
  ...
  return data;
}
...
const parseDealerName = (name: string) => {
  let parsedName = '';
  ...
  return parsedName;
}

// do this ✅
getDealers(dealerId: string): Dealers[] {
  let data: Dealers[] = [];
  ...
  return data;
}
...
private getDealerByName(name: string): Dealer {
  let data = new Dealer();
  ...
  return data;
}
...
const parseDealerName: string = (name: string) => {
  let parsedName = '';
  ...
  return parsedName;
}
```

Do declare function return types — it promotes readability and maintainability. Doing this will also help with development, as it will warn you if any changes are made that alter the return type.

---

## Group Variables by Access Modifiers, Sort Alphabetically

```ts
// do not do this ❌
export class AppComponent {
  isDealerAdmin = false;
  private hasDataLoaded = false;
  hasNoHost = false;
  private isAdmin = true;
  @Input() hostData = [];
  activatedLicense = false;
  @Output() selectedDealer = null;
  protected unsubscribe = new Subject<void>();
  constructor(private _auth: AuthService) {
    ...
  }
  ...
}

// do this ✅
export class AppComponent {
  @Input() hostData = [];
  @Output() selectedDealer = null;
  activatedLicense = false;
  hasNoHost = false;
  isDealerAdmin = false;
  private hasDataLoaded = false;
  private isAdmin = true;
  protected unsubscribe = new Subject<void>();
  constructor() {
    ...
  }
  ...
}
```

Do arrange variables in an orderly manner. In particular, group the variables by access modifiers in the following order:

`public → private → protected`

And then proceed to sort alphabetically.

**Variable sort order:**
1. Decorators (`@Input`, `@Output`)
2. Public — variables accessible in the HTML side
3. Private — variables within the `.ts` file only
4. Protected — special variables

---

## Group Functions by Access Modifiers, Sort Alphabetically

```ts
// do not do this ❌
export class AppComponent {
  ...
  constructor() {
    ...
  }
  private getDealers(): void {
    ...
  }
  getDealerById(): void {
    ...
  }
  protected getCurrentUser(): void {
    ...
  }
  submitForm(): void {
    ...
  }
}

// do this ✅
export class AppComponent {
  ...
  constructor() {
    ...
  }
  public getDealerById(): void {
    ...
  }
  public submitForm(): void {
    ...
  }
  private getDealers(): void {
    ...
  }
  protected getCurrentUser(): void {
    ...
  }
}
```

Do arrange functions in an orderly manner. In particular, group the functions by access modifiers in the following order:

`public → private → protected`

And then proceed to sort alphabetically.

---

## Bootstrap Row and Column Class Usage

```html
<!-- do not do this ❌ -->
<div class="container">
      <div class="col-lg-12">
          <p>My mother left me!</p>
      </div> <!-- col class without a parent row -->
</div>

<!-- do this ✅ -->
<div class="container">
      <div class="row">
          <div class="col-lg-12">
              <h1>Happy Family!</h1>
              <div class="row">
                  <div class="col-lg-8">...</div>
                  <div class="col-lg-4">...</div>
              </div>
          </div>
      </div>
</div>
```

In the Bootstrap CSS framework, each `.col-*` is placed within a parent `.row` class, ensuring proper alignment within the Bootstrap grid system.

Never use a `.col-*` class without its parent, which is the `.row` class. This rule applies even when nesting Bootstrap rows and columns.

**Keep in mind:**
- 1-level implementation: `row → col`
- Nested: `row → col → row → col`

---

## Angular `(click)`-ables

```html
<!-- do not do this ❌ -->
<span class="fas fa-times" (click)="delete()"></span>

<!-- do this ✅ -->
<button (click)="delete()">
    <span class="fas fa-times">
    </span>
</button>
```

For clickables, if the component is expected to behave as a button, always wrap it with `<button>` tags.

There will be cases when there are custom components or containers that have a click trigger, which is fine as long as they're not expected to display and behave as a button.

---

## Console Logging

```ts
// do not do this ❌
this._apiCall().subscribe(
  (data) => {
    ...
  },
  (error) => {
    // logging error
    console.log('Error': error)
  }
)

// do this ✅
// instead of console.log, use console.error
(error) => {
    console.error('Error': error)
}
```

On version 2, we aim to have centralized error handling for API calls.

While the visual representation may remain unchanged when inspected through the browser's developer tools, our aim is to minimize the presence of `console.log` statements throughout the site.

However, permitting `console.error` provides us with a means of tracking errors specifically within our codebase, ensuring that our logging focuses primarily on identifying and addressing critical issues.