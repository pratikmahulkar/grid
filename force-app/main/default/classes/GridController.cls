public with sharing class GridController {
  @AuraEnabled
  public static GridConfig getGridConfig(
    String gridConfigName,
    List<String> criteriaParams
  ) {
    System.debug('called getGridConfig');
    GridConfig config = new GridConfig(gridConfigName, criteriaParams);
    System.debug(config);
    return config;
  }

  @AuraEnabled
  public static Map<String, GridConfig> getGridConfigs(
    List<String> gridConfigNames
  ) {
    Map<String, GridConfig> configs = new Map<String, GridConfig>();
    List<Grid_Config__mdt> gridConfigs = [
      SELECT
        Id,
        DeveloperName,
        MasterLabel,
        Label,
        QualifiedApiName,
        Query__c,
        Key_Field__c,
        default_sort_direction__c,
        enable_infinite_loading__c,
        hide_checkbox_column__c,
        hide_table_header__c,
        load_more_offset__c,
        max_column_width__c,
        max_row_selection__c,
        min_column_width__c,
        resize_column_disabled__c,
        resize_step__c,
        row_number_offset__c,
        show_row_number_column__c,
        sorted_by__c,
        sorted_direction__c,
        suppress_bottom_bar__c,
        wrap_text_max_lines__c,
        (
          SELECT
            Id,
            Label,
            Grid_Config__c,
            Field_Name__c,
            Type__c,
            Sort_Order__c
          FROM Grid_Columns__r
        )
      FROM Grid_Config__mdt
      WHERE DeveloperName IN :gridConfigNames
    ];
    for (Grid_Config__mdt gridConfig : gridConfigs) {
      configs.put(gridConfig.DeveloperName, new GridConfig(gridConfig));
    }
    return configs;
  }
}