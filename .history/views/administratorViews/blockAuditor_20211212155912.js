<!-- MAIN CONTENT -->
<div class="container">
  <div class="row">
    <div class="col-md-offset-3 col-md-6">
      <h1><%= title %></h1>
        <form class="form" method="post">
          

          
            
                <label for="comment">Why would you like to block seeker <%= seeker %> ?</label>
                <textarea name="comment" class="form-control" rows="5" required></textarea>
      
         <br>

          <button type="submit"  class="btn btn-primary"><i class="fa fa-check-square-o"></i> Block seeker</button>
          
        </form>
    </div>
  </div>
</div>