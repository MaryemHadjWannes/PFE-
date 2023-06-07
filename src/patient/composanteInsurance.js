import React, { useState } from 'react';
import './composanteInsurance.css';

const HealthInsurance = () => {
 
  return (
    <div className="main-content">
          <div className="containerInsurance" >
          <section class="pricing-section">
    
		<div class="row justify-content-md-center">
			<div class="col-xl-5 col-lg-6 col-md-8">
				<div class="section-title text-center title-ex1">
					<h2>Pricing Tables</h2>
					<p>Inventore cillum soluta inceptos eos platea, soluta class laoreet repellendus imperdiet optio.</p>
				</div>
			</div>
		</div>
		

		<div class="row">
			<div class="col-md-4">
				<div class="price-card ">
					<h2>Personal</h2>
					<p>The standard version</p>
					<p class="price"><span>49</span>/ Month</p>
					<ul class="pricing-offers">
						<li>6 Domain Names</li>
						<li>8 E-Mail Address</li>
						<li>10GB Disk Space</li>
						<li>Monthly Bandwidth</li>
						<li>Powerful Admin Panel</li>
					</ul>
					<a href="#" class="btn btn-primary btn-mid">Buy Now</a>
				</div>
			</div>
			<div class="col-md-4">
				<div class="price-card featured">
					<h2>Student</h2>
					<p>Most popular choice</p>
					<p class="price"><span>69</span>/ Month</p>
					<ul class="pricing-offers">
						<li>6 Domain Names</li>
						<li>8 E-Mail Address</li>
						<li>10GB Disk Space</li>
						<li>Monthly Bandwidth</li>
						<li>Powerful Admin Panel</li>
					</ul>
					<a href="#" class="btn btn-primary btn-mid">Buy Now</a>
				</div>
			</div>
			<div class="col-md-4">
				<div class="price-card ">
					<h2>Business</h2>
					<p>For the whole team</p>
					<p class="price"><span>89</span>/ Month</p>
					<ul class="pricing-offers">
						<li>6 Domain Names</li>
						<li>8 E-Mail Address</li>
						<li>10GB Disk Space</li>
						<li>Monthly Bandwidth</li>
						<li>Powerful Admin Panel</li>
					</ul>
					<a href="#" class="btn btn-primary btn-mid">Buy Now</a>
				</div>
			</div>
		</div>

</section>
       
         
      </div>
    </div>
  
  );
};

export default HealthInsurance;
