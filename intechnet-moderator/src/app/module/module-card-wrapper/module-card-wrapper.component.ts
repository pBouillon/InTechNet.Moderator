import { Component, OnInit, Input } from '@angular/core';
import { Module } from 'src/app/_models/entities/module/module';
import { LightweightSubscriptionPlan } from 'src/app/_models/entities/subscription-plan/lightweight-subscription-plan';
import { Tag } from 'src/app/_models/entities/module/tag';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { ModuleService } from 'src/app/_services/module/module.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  @Input()
  public idHub: number;

  /**
   * @summary default constructor
   */
  constructor(
    private authenticationService: AuthenticationService,
    private moduleService: ModuleService,
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

    this.moduleService.getAvailableModulesForHub(this.idHub)
      .subscribe(
        (modules: Array<Module>) => {
          this.availableModules = modules;
        },
        (error: HttpErrorResponse) => {
          let errorMessage = '';
          switch (error.status) {
            case 400:
              errorMessage = 'Impossible de récupérer les modules de ce hub';
              return;

            case 401:
              errorMessage = 'Vous devez être connecté pour effectuer cette action';
              return;
          }

          this.toastr.error(errorMessage, 'Erreur de communication avec le serveur');
        }
      );
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
    const clickedModule = this.availableModules[cardId];

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
    this.moduleService.toggleModuleAvailability(this.idHub, clickedModule.id)
      .subscribe(
        // On success, toggle the object status
        () => clickedModule.isActive = !clickedModule.isActive,
        // Show toastr on error
        (error: HttpErrorResponse) => {
          let errorMessage = '';
          switch (error.status) {
            case 400:
              errorMessage = 'Un problème est survenu';
              return;
            case 401:
              errorMessage = 'Vous devez être connecté pour effectuer cette opération';
              return;
          }
          this.toastr.error(errorMessage, 'Impossible de sélectionner ce module');
        }
      );
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
