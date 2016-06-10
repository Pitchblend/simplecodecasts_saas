class ProfilesController < ApplicationController
    def new
        # Form where user can fill out their own profile.
        # Determine who is logged in.
        @user = User.find( params[:user_id])
        # Build form
        @profile = @user.build_profile
    end
end