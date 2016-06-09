class Users::RegistrationsController < Devise::RegistrationsController
    def create
        # Overide inherited create function from Devise
        super do |resource|
            if params[:plan]
                #Assign plan to user
                resource.plan_id = params[:plan]
                if resource.plan_id == 2
                    resource.save_with_payment
                else
                    resource.save
                end
            end
        end
    end
end