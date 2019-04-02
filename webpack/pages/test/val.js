module.exports = (opts)=>{
  return {
    code: 'module.exports = '+ JSON.stringify(opts.years)+' ;',
    cacheable: true
  }
}