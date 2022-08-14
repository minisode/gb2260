module GB2260
  class Division
    attr_reader :code
    attr_reader :name

    def initialize(code)
      @code = code.to_i
      @name = GB2260[code].fetch(:name)
    end

    def province?
      @code.modulo(10_000).zero?
    end

    def prefecture?
      @code.modulo(100).zero? and not province?
    end

    def county?
      @code.modulo(100).positive?
    end

    def parent
      unless province?
        self.class.new(@code.floor(county? ? -2 : -4))
      end
    end

    def children
      GB2260.divisions.select do |division|
        division.parent&.code.eql?(@code)
      end
    end
  end
end
