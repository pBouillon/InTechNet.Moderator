import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/_models/entities/module/module';
import { LightweightSubscriptionPlan } from 'src/app/_models/entities/subscription-plan/lightweight-subscription-plan';
import { Tag } from 'src/app/_models/entities/module/tag';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Component({
  selector: 'app-module-card-wrapper',
  templateUrl: './module-card-wrapper.component.html',
  styleUrls: ['./module-card-wrapper.component.scss']
})
export class ModuleCardWrapperComponent implements OnInit {

  /**
   * @summary array of all available modules
   */
  public availableModules: Array<Module> = [];

  /**
   * @summary maximum module that can be selected simultaneously
   */
  public maxAllowedModules: number;

  /**
   * @summary whether the maximum number of modules simultaneously selected
   *          is reached or not
   */
  public get maxAllowedModulesReached(): boolean {
    return this.maxAllowedModules === this.getSelectedModulesCount();
  }

  /**
   * @summary size of the sub arrays of modules to be made
   */
  private modulesGroupsSize = 3;

  /**
   * @summary default constructor
   */
  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
  ) { }

  /**
   * @summary initialize content
   */
  ngOnInit(): void {
    this.maxAllowedModules = this.authenticationService
      .currentModerator
      .subscriptionPlanDto
      .maxModulePerHub;

    this.retrieveAvailableModules();
  }

  /**
   * @summary get the number of currently activated modules
   * @returns the number of currently activated modules
   */
  public getSelectedModulesCount(): number {
    return this.availableModules
      .filter(_ => _.isActive)
      .length;
  }

  /**
   * @summary toggle the card status for this hub
   */
  public onModuleCardClick(lineNb: number, colNb: number): void {
    // Retrieve the ID of the card from its place in the deck
    const cardId = lineNb * this.modulesGroupsSize + colNb;

    // Retrieve the corresponding module object
    const clickedModule = this.availableModules
      .filter(el => el.id === cardId)[0];

    // If no objects are matching, toast the error and exit
    if (clickedModule === undefined) {
      this.toastr.error(
        'Impossible d\'interagir avec ce module',
        'Une erreur est survenue');
      return;
    }

    // Check if any selection is possible to activate another module
    if (this.maxAllowedModulesReached && !clickedModule.isActive) {
      this.toastr.error(
        'Vous avez atteint le nombre maximum de modules pour ce hub',
        'Impossible de sélectionner ce module');
      return;
    }

    // Toggle the card state
    clickedModule.isActive = !clickedModule.isActive;

    // TODO: make the API call
  }

  /**
   * @todo TESTING METHOD - TO BE REMOVED
   */
  private createDummyModule(id: number): Module {
    const dummySP = new LightweightSubscriptionPlan(
      { idSubscriptionPlan: 1, subscriptionPlanName: 'Standard' }
    );

    return new Module(
      {
        description: 'A very interesting description A very interesting description A very interesting description A very interesting description',
        id,
        isActive: false,
        moduleSubscriptionPlanDto: dummySP,
        name: 'My dummy module',
        tags: [new Tag({ id: 1, name: 'tag 1' })]
      });
  }

  /**
   * @summary retrieve all available modules for this hub
   */
  private retrieveAvailableModules(): void {
    // TODO: replace by API call
    let id = 0;
    this.availableModules = [
      this.createDummyModule(id++),
      this.createDummyModule(id++),
      this.createDummyModule(id++),
      this.createDummyModule(id++),
      this.createDummyModule(id++),
      this.createDummyModule(id++),
      this.createDummyModule(id++),
      this.createDummyModule(id++),
      this.createDummyModule(id),
    ];
  }

  /**
   * @summary Rearrange an array of module into an array of modules grouped in another array
   * @param toGroup array of modules to group
   * @param groupSize size of the groupes to be done, default value is `modulesGroupsSize`
   * @returns An array of sub arrays of modules with up to groupSize elements per sub array
   */
  public toGroupedModules(toGroup: Array<Module>, groupSize: number = this.modulesGroupsSize): Array<Array<Module>> {
    const groupedModules = [];

    toGroup.map((el, index) =>
      index % groupSize === 0
        ? groupedModules.push([el])
        : groupedModules[groupedModules.length - 1].push(el));

    return groupedModules;
  }

}
