# ng-grid

Grid list of restaurants powered by Angular

### Demo
* Application is live at: https://arikanmstf.github.io/ng-grid/

### Install
* Clone the repo, install and run;
* `$ git clone https://github.com/arikanmstf/ng-grid.git`
* `$ npm ci`
* `$ npm run start`
* Visit: http://localhost:4200/

### Features
* Lazy module loading; Route components loaded at run time. See `app-routing.module.ts`.
* Angular Material as UI library
* Sorting using Angular Material sorting module. See `restaurants-table.component.html`.
* Pagination using Angular Material pagination module. See `restaurants-table.component.html`.
* Filtering results by status.
* Overlay loader during get-restaurants call. See `app-overlay-loader` at `restaurants-table.component.scss`.
* State management with NGXS; App keeps the restaurant list and search parameters at the state.
So that when user navigates back to restaurant list, app will not fetch the restaurants from api again.
Instead, it'll show the existing data from the app state. As a result, app calls api only at initial load, and when search parameters changes.
See `app.state.ts` and `restaurants.component.ts`.
* Form validation and submission using Reactive forms module of Angular. See `manage-restaurant.component.ts`.
* Responsive layout: Minimum supported width: `380px`

### Testing
* Linting with eslint and prettier; Run `npm run lint`
* Covered by unit tests with Jasmine & Karma.
  * See `manage-restaurant.component.spec.ts` for asserting form validation & submission
  * See `restaurant.service.spec.ts` for api call
  * See `restaurants.component.spec.ts` for rendering restaurants table

### Automation
* When pushed to master; runs tests with `ng lint` and `ng test`; and if tests passed, builds and deploys to GitHub pages
* Using GitHub actions, see `build.yml`
