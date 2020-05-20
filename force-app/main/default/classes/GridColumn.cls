public with sharing class GridColumn {
    Grid_Column__mdt column = null;
    public GridColumn(Grid_Column__mdt column) {
        this.column = column;
    }
    @AuraEnabled
    public String label{
        get{
            return this.column != null ? this.column.Label:null;
        }
    }
    @AuraEnabled
    public String fieldName{
        get{
            return this.column != null ? this.column.Field_Name__c:null;
        }
    }
    @AuraEnabled
    public String type{
        get{
            return this.column != null ? this.column.Type__c:null;
        }
    }
}