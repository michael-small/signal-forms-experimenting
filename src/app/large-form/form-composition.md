# Nested Form Composition

WARNING: This draft was written up without formal documentation writing guidance, and much of the code was written directly into the markdown. These examples come from the general experience with the actual provided code examples in this project.

There are a few options for nesting subpieces of a form across multiple components.

NOTE: While the [`FormValueControl`](https://angular.dev/guide/forms/signals/custom-controls) interface is an option, it is best suited for specialized controls that need a particular implementation.

Three are three approaches that can be used to handle nested forms.

1. `input.required<FieldTree<T>>`
1. `model.required<T>` + `form(this.model)`
1. Service

Each approach has it's own strengths and weaknesses.

## `FieldTree<T>` refresher

Subparts of a signal form are `FieldTree<T>`.

```ts
@Component({
    template: `
      // `profileForm` is `FieldTree<{profile: {name: string}}>`
      // `profileForm.profile` is `FieldTree<{name: string}>`
      // `profileForm.profile.name` is `FieldTree<string>`
      [formField]="profileForm.profile.name"
    `
}) class ProfileForm {
  private model = signal({
    profile: {
      name: '',
    },
  });

  profileForm = form(this.model, (p) => {
    //...
  });
}
```

## Approaches

### `input.required<FieldTree<T>>`

`FormTree<T>` pieces can be passed directly to child components via `input`.

```ts
@Component({
  imports: [Child],
  template: ` <app-child [nameForm]="profileForm.profile.name" /> `,
})
export class Parent {
  private model = signal({
    profile: {
      name: '',
    },
  });

  profileForm = form(this.model, (p) => {
    //...
  });
}

@Component({
  selector: 'app-child',
})
export class Child {
  nameForm = input.required<FieldTree<string>>();
}
```

This approach consolidates form logic in the parent. On one hand, this provides a source of truth for form logic in one singular place, but on the other hand, form logic may not be evident in the children without having the parent file open for reference.

An upside of this approach is also that the domain to form transformation is done once in the parent.

### `model.required<T>` + `form(this.model)`

Using `model` inputs allows child component forms to own their own form logic while still
syncing values between parent and child.

```ts
@Component({
  imports: [Child],
  template: ` <app-child [(model)]="model().profile.name" /> `,
})
class Parent {
  private model = signal({
    profile: {
      name: '',
    },
  });
}

@Component({
  selector: 'app-child',
})
class Child {
  model = model.required<string>();
  form = form(this.model, (p) => {
    //...
  });
}
```

A potential downside of this approach is that the child components each may have some interaction with the domain logic to be able to derive the form model. However, provided the two way binding syntax of `[(model)]` is used, there may not be a layer of transforming form model back to domain model, as the parent component maintains the domain shape.

### Service

Forms and their models can be located in an injectable `@Service` (TODO - vs injectable standard note), and available via `inject` in any part of the form's component tree.

```ts
@Service()
export class FormService {
  private model = signal({
    profile: {
      name: '',
    },
  });

  public form = form(this.model, (p) => {
    // ...
  });
}

@Component({
  selector: 'app-child',
})
class Child {
  readonly formService = inject(FormService);
  form = this.formService.form;
}
```

This approach works akin to how the `input.required<FormTree<T>>` approach works, but with `inject` rather than `input`. An upside of this service approach compared to the input approach is that even the parent form has a layer of seperation from the domain model layer. Additionally, each layer of the form components has access to whatever other shared logic is exposed from the service.

One downside of the form service approach is how child components which are one form in an array of form values works, and is explained in the next section.

## Arrays in children

A child form component may be an item in a form's array field.

For the `input<FieldTree<T>>` and `model<T>` + `form(this.model)` approaches,
child form components are naturally accessed.

Form the form Service approach, use the `$index` of the parent component's `@for` iteration of these individual array form items.

```ts
@Component({
  imports: [Child],
  template: `
    @for (form of profiles; track form) {
      <app-child [index]="$index" />
    }
  `,
})
class Parent {
  profilesForm = inject(FormService).form; // FieldTree<{profiles: {name: ''}[]}>
}

@Component({
    template: `
        @let profileForm = this.profileForm()()
    `
})
class Child {
  formService = inject(FormService);
  index = input.required<number>();

  profileForm = computed(() => this.formService.form.profiles[this.index()]))

  // Double form invocations required
  profileFormValue = computed(() => this.profileForm()().value())
}
```

`@let` can be used to cut down signal invocations in the template, but access in the class
will require to signal invocations.
