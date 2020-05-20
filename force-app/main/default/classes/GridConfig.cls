public with sharing class GridConfig {
  Grid_Config__mdt gridConfig = null;
  List<String> criteriaParams = null;

  public GridConfig(String gridConfigName, List<String> criteriaParams) {
    this.gridConfigName = gridConfigName;
    this.criteriaParams = criteriaParams;
    List<Grid_Config__mdt> gridConfigs = [
      SELECT
        Id,
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
        wrap_text_max_lines__c
      FROM Grid_Config__mdt
      WHERE DeveloperName = :this.gridConfigName
    ];
    if (gridConfigs.size() > 0) {
      gridConfig = gridConfigs[0];
    }
    List<Grid_Column__mdt> columns = [
      SELECT Id, Label, Grid_Config__c, Field_Name__c, Type__c, Sort_Order__c
      FROM Grid_Column__mdt
      WHERE Grid_Config__r.DeveloperName = :this.gridConfigName
      ORDER BY Sort_Order__c
    ];
    for (Grid_Column__mdt column : columns) {
      GridColumn gridColumn = new GridColumn(column);
      this.columns.add(gridColumn);
    }
  }

  public GridConfig(Grid_Config__mdt gridConfig) {
    this.gridConfig = gridConfig;
    if (gridConfig.Grid_Columns__r != null)
      for (Grid_Column__mdt column : gridConfig.Grid_Columns__r) {
        GridColumn gridColumn = new GridColumn(column);
        this.columns.add(gridColumn);
      }
  }

  @AuraEnabled
  public String keyField {
    get {
      return this.gridConfig != null ? this.gridConfig.Key_Field__c : 'Id';
    }
  }
  String query {
    get {
      return this.gridConfig != null ? this.gridConfig.Query__c : null;
    }
  }
  public String gridConfigName;

  @AuraEnabled
  public List<GridColumn> columns = new List<GridColumn>();
  @AuraEnabled
  public List<SObject> data {
    get {
      return Database.query(String.format(this.query, criteriaParams));
    }
  }

  @AuraEnabled
  public String defaultSortDirection {
    get {
      return this.gridConfig != null
        ? this.gridConfig.default_sort_direction__c
        : null;
    }
  }

  @AuraEnabled
  public Boolean enableInfiniteLoading {
    get {
      return this.gridConfig != null
        ? this.gridConfig.enable_infinite_loading__c
        : null;
    }
  }

  @AuraEnabled
  public Boolean hideCheckboxColumn {
    get {
      return this.gridConfig != null
        ? this.gridConfig.hide_checkbox_column__c
        : null;
    }
  }

  @AuraEnabled
  public Boolean hideTableHeader {
    get {
      return this.gridConfig != null
        ? this.gridConfig.hide_table_header__c
        : null;
    }
  }
  @AuraEnabled
  public Decimal loadMoreOffset {
    get {
      return this.gridConfig != null
        ? this.gridConfig.load_more_offset__c
        : null;
    }
  }
  @AuraEnabled
  public String maxColumnWidth {
    get {
      return this.gridConfig != null
        ? this.gridConfig.max_column_width__c
        : null;
    }
  }

  @AuraEnabled
  public Decimal maxRowSelection {
    get {
      return this.gridConfig != null
        ? this.gridConfig.max_row_selection__c
        : null;
    }
  }

  @AuraEnabled
  public String minColumnWidth {
    get {
      return this.gridConfig != null
        ? this.gridConfig.min_column_width__c
        : null;
    }
  }

  @AuraEnabled
  public Decimal wrapTextMaxLines {
    get {
      return this.gridConfig != null
        ? this.gridConfig.wrap_text_max_lines__c
        : null;
    }
  }

  @AuraEnabled
  public Boolean suppressBottomBar {
    get {
      return this.gridConfig != null
        ? this.gridConfig.suppress_bottom_bar__c
        : null;
    }
  }

  @AuraEnabled
  public String sortedDirection {
    get {
      return this.gridConfig != null
        ? this.gridConfig.sorted_direction__c
        : null;
    }
  }
  @AuraEnabled
  public String sortedBy {
    get {
      return this.gridConfig != null ? this.gridConfig.sorted_by__c : null;
    }
  }
  @AuraEnabled
  public Boolean showRowNumberColumn {
    get {
      return this.gridConfig != null
        ? this.gridConfig.show_row_number_column__c
        : null;
    }
  }

  @AuraEnabled
  public Boolean resizeColumnDisabled {
    get {
      return this.gridConfig != null
        ? this.gridConfig.resize_column_disabled__c
        : null;
    }
  }

  @AuraEnabled
  public String resizeStep {
    get {
      return this.gridConfig != null ? this.gridConfig.resize_step__c : null;
    }
  }

  @AuraEnabled
  public Decimal rowNumberOffset {
    get {
      return this.gridConfig != null
        ? this.gridConfig.row_number_offset__c
        : null;
    }
  }
}