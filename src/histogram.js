import { binnedHist } from './binned_hist/binned_hist'
import { simpleHist } from './simple_hist/simple_hist'
import { baseOptions } from './common/options'
import { handleErrors } from './common/vega_utils'


looker.plugins.visualizations.add({
  options: baseOptions,
  create: function(element, config) {
    var container = element.appendChild(document.createElement("div"));
    container.setAttribute("id","my-vega");
  },

  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    if(config.bin_style === 'binned_hist'){
      if (!handleErrors(this, queryResponse, {
        min_pivots: 0, max_pivots: 0,
        min_dimensions: 1, max_dimensions: undefined,
        min_measures: 2, max_measures: undefined
      })) return
      
      binnedHist(data, element, config, queryResponse, details, doneRendering, this);
    
    } else {
      if (!handleErrors(this, queryResponse, {
        min_pivots: 0, max_pivots: 0,
        min_dimensions: 1, max_dimensions: 1,
        min_measures: 1, max_measures: undefined
      })) return
    
      simpleHist(data, element, config, queryResponse, details, doneRendering, this);
    }
  }

})